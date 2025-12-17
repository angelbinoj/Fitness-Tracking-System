import jwt from "jsonwebtoken";
import { UserDb } from "../models/userModel.js";

export const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
           return res.status(401).json({ message: 'Authentication required. No token provided.' })
        }
        const tokenValue = token.split(" ")[1]
        
        jwt.verify(tokenValue, process.env.JWT_SECRET, (err, user) => {
            
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token.' });
            }
            
            req.user = user;
            console.log(req.user);
            console.log(tokenValue);
            next()
        })

    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}

export const authorizeRole = (allowedRoles)=>{
    return (req,res,next)=>{
        const userRole= req.user.role;
        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({ message: 'Access denied. You do not have the required permissions!',userRole });
        }
        next();
    };
};


export const isClientAssignedToTrainer = async (req, res, next) => {
    
    try {
        
        const trainerId = req.user.id;
        const clientId = req.params.id;
        
        const client = await UserDb.findById(clientId).select('assignedTrainer');

        if (!client) {
            return res.status(404).json({ message: 'Client not found.' });
        }

        if (client.assignedTrainer && client.assignedTrainer.toString() === trainerId.toString()) {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied: You are not assigned to this client.' });
        }

    } catch (error) {
         return res.status(403).json({ message: 'Access denied. You do not have the required permissions!' });
    }
};
