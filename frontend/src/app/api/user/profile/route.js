import connectDB from "@/backend/lib/mongodb";
import User from "@/backend/models/user.model";
import { verifyToken } from "@/backend/utils/auth";

export default async function handler(req, res) {
    if (req.method === "GET") {
      try {
        await connectDB();
  
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({ user, message: "User profile fetched successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  
  export const config = {
    api: {
      bodyParser: false,
      externalResolver: true,
    },
  };










        // ============================


// export const GET = async (req) => {
//     try {
//         const { searchParams } = new URL(req.url);
//         const userId = searchParams.get("userId");

//         if (!userId) {
//             return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
//         }
        

//         await connectDB();
//         const user = await User.findById(userId);

//         if (!user) {
//             return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
//         }

//         return new Response(
//             JSON.stringify({
//                 user: {
//                     userId: user._id,
//                     username: user.username,
//                     email: user.email,
//                     profileImage: user.profileImage,
//                 },
//                 success: true,  
//             }),
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Error fetching user profile:", error);
//         return new Response(JSON.stringify({ error: "Error fetching profile" }), { status: 500 });
//     }
// };

          