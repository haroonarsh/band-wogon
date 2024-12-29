import User from "@/backend/models/user.model";
import { connectDB } from "./mongodb";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";

export const authOptions = {
    provider: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({ email: credentials?.email });
                if (!user) throw new Error("Wrong Email Credentials");
                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!passwordMatch) throw new Error("Wrong Password Credentials");

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    }
}