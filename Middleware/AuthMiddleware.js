import passport from "passport";

module.exports = passport.authenticate("jwt", {session:false});

import jwt from "jsonwebtoken";
import user from "../models/user";

const authMiddleware  = async(req, res, next) => {
    try {
        //get token from header
        const token = req.header('Authorization')?.replace('Bearer',    "");
        if (!token) {
            return res.status(401).json({message: "No token, authorization denied"});
        }
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //find user by id
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({message: "No user found"});
        }
        // Attach user to request object
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(500).json({message: "Server Error"})
        console.log("error", error)
    }

};

module.exports = authMiddleware;