import connectDB from "@/backend/lib/mongodb";
import User from "@/backend/models/user.model";
import bcrypt from "bcryptjs";
import { generateTokens } from "@/backend/utils/generateTokens";

export async function POST(req) {
    try {
      const { email, password } = await req.json();
  
      // Check if both email and password are provided
      if (!email || !password) {
        return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 });
      }
  
      // Connect to the database
      await connectDB();
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
      }
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
      }
  
      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user);
  
      // Set refreshToken in a secure HttpOnly cookie
      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-age=${7 * 24 * 60 * 60}; SameSite=Lax; Secure`
      );

      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage || null,
      }
  
      // Return the accessToken and success message
      return new Response(
        JSON.stringify({ accessToken, user: userData ,message: "Login successful" }),
        { status: 200, headers }
      );
    } catch (error) {
      console.error("Login error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
  }





// export async function POST(req) {
//     // if (req.method !== 'POST') {
//     //     return new Response( { error: "Method not allowed" }, { status: 405 });
//     // }

//     try {
        

//         const  { email, password } = await req.json();

//         if (!email || !password) {
//             return new Response({ error: "All fields are required" }, { status: 400 });
//         }
 
//         await connectDB();

//         const user = await User.findOne({ email });
//         if (!user) {
//             return new Response({ error: "User not found" }, { status: 404 });
//         }
        
//         const passwordMatch = await user.comparePassword(password);
//         if (!passwordMatch) {
//             return new Response({ error: "Invalid credentials" }, { status: 401 });
//         }

//         const { accessToken, refreshToken } = generateTokens(user);
        
//         return new Response({ accessToken, refreshToken, message: "Login successful" });
//     } catch (error) {
//         console.error("Error during login:", error);
//         return new Response({ error: "An error occurred. Please try again" }, { status: 500 });
//     }
// }