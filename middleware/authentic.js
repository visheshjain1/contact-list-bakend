import Login from "../model/login.js";
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.params.cook;
        console.log(req)
        if (!token) {
            return res.status(401).json({
                message: "Please login first",
            });
        }

        const decoded = await jwt.verify(token, 'special_secret');

        req.user = await Login.findById(decoded._id);

        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

