import jwt from "jsonwebtoken";
import Hospital from "../models/HospitalSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req,res,next)=>{

    //get token from headers
    const authToken = req.headers.authorization;

    //check token is exists
    if(!authToken || !authToken.startsWith('Bearer ')){
        return res.status(401).json({success:false, message:'No token, authorization denied'});
    }

    try {
        const token = authToken.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.userId = decoded.id;
        req.role = decoded.role;

        next();
    } catch (err) {
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({message:'Token is expired'})
        }

        return res.status(401).json({success:false, message:'Invalid Token'})
    }
};
export const restrict = roles => async (req, res, next) => {
    const userId =req.userId

    let user;

    const patient = await User.findById(userId);
    const hospital = await Hospital.findById(userId)

    if(patient){
        user=patient
    }
    if(hospital){
        user=hospital
    }

    if(!roles.includes(user.role)){
        return res.status(401).json({success:false, message:'You are not authorized'})
    }
    next();
};