import connectDB from "@/backend/lib/mongodb";
import User from "@/backend/models/user.model";

export const POST = async (req) => {
    try {
        
                // Clear the refreshToken cookie
        return new Response(JSON.stringify({ message: "Logout successful"}),
            { 
                status: 200,
                headers: {
                    "Set-Cookie": "refreshToken=; HttpOnly; Path=/; Max-age=0; SameSite=Lax",
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Logout error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}