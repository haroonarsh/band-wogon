import connectDB from "@/backend/lib/mongodb";
import User from "@/backend/models/user.model";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import CredentialProvider from "next-auth/providers/credentials";
import createOrUpdateUser from "@/backend/utils/createOrUpdatauser";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) throw new Error("No user found with this email");

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) throw new Error("Invalid email or password");

        return {
          id: user._id,
          email: user.email,
          username: user.username,
          profileImage: user.profileImage || null,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        const dbUser = await createOrUpdateUser(user, account, profile);
        token.id = dbUser._id;
        token.email = dbUser.email;
        token.name = dbUser.username;
        token.profileImage = dbUser.profileImage;
        token.location = dbUser.location;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.name,
        profileImage: token.profileImage || "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
        location: token.location,
      };
      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export function handlers(req, res) {
    if (!['GET', 'POST'].includes(req.method)) {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}