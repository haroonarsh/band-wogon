// import express from "express";
// import passport from "passport";
// import authenticate from "../middlewares/auth.middleware.js";

// const router = express.Router();

//                 // Google routes
//         // google auth
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
//         // google callback
// router.get('/google/callback', passport.authenticate('google', { session: false, successRedirect: 'http://localhost:3000/home', failureRedirect: 'http://localhost:3000/login' }),
// (req, res) => {
//         if (!req.user) {
//                 return res.status(401).json({ message: 'Authentication failed' });
//         }

//         const { user, token } = req.user;

//         return res.status(200).json({
//                 message: 'Authentication successful',
//                 user: {
//                         username: user.username,
//                         email: user.email,
//                         profileImage: user.profileImage
//                 },
//                 accessToken: token,
//         })
         
// }
// )

// export default router;