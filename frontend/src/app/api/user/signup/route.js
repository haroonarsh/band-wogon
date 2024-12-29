import connectDB from "@/backend/lib/mongodb";
import User from "@/backend/models/user.model";
import { generateTokens } from "@/backend/utils/generateTokens";
import { response } from "express";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
};

export const POST = async (req) => {
    try {
      const { username, email, password } = await req.json();
  
      if (!username || !email || !password) {
        return new Response(
          JSON.stringify({ error: "All fields are required" }),
          { status: 400 }
        );
      }
  
      await connectDB();
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return new Response(
          JSON.stringify({ error: "User already exists" }),
          { status: 400 }
        );
      }
  
      // Create a new user
      const user = new User({ 
        username, 
        email, 
        password 
      });
      await user.save();
  
      // Generate tokens
      let accessToken, refreshToken;
      try {
        ({ accessToken, refreshToken } = generateTokens(user));
      } catch (tokenError) {
        console.error("Error generating tokens:", tokenError);
        return new Response(
          JSON.stringify({ error: "Token generation failed" }),
          { status: 500 }
        );
      }
  
      // Set the refresh token as a cookie
      try {
        return new Response(
          JSON.stringify({ accessToken, message: "User created successfully" }),
          {
            status: 201,
            headers: {
              "Set-Cookie": `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${
                7 * 24 * 60 * 60
              }; SameSite=Lax`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (cookieError) {
        console.error("Error setting cookie:", cookieError);
        return new Response(
          JSON.stringify({ error: "Failed to set cookie" }),
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Error creating user:", error); // Add detailed error logging
      return new Response(
        JSON.stringify({ error: "Error creating user" }),
        { status: 500 }
      );
    }
  };









// export default async function handler(req, res) {
//     if (!req.method !== 'POST') {
//         return res.status(405).json({ message: "Method not allowed" });
//     }

//     const { username, email, password } = req.body;

//     await connectDB(); // Connect to the database

//     if (!username || !email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }   

//     // if (password !== confirmPassword) {
//     //     return res.status(400).json({ message: "Passwords do not match" });
//     // }

//     try {
//         const user = new User({
//             username,
//             email,
//             password,
//         });
//         await user.save();

//         const { accessToken, refreshToken } = generateTokens(user);
//         res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-age=${7 * 24 * 60 * 60}; SameSite=Lax`);

//         return res.status(201).json({ accessToken, message: "User created successfully" });
//     } catch (error) {
//         res.status(400).json({ message: "Error creating user" });
//     }
// }