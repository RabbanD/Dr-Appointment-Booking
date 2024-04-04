import User from '../models/UserSchema.js';
import Hospital from '../models/HospitalSchema.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const generateToken = user => {
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    })
}

export const register = async (req, res)=>{

    const {email, password, name, role, photo} =req.body;
    
    try {
        let user = null;   
        
        if(role === 'patient'){
            user = await User.findOne({email})
        }
        else if(role === 'hospital'){
            user = await Hospital.findOne({email})

        }

        //check if user exist
        if(user){
            return res.status(400).json({message:'User already exist'})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        if(role === 'patient'){
            user = new User({
                name,
                email,
                password:hashPassword,
                photo,
                role
            })
        }

        if(role === 'hospital'){
            user = new Hospital({
                name,
                email,
                password:hashPassword,
                photo,
                role
            })
        }

        await user.save();
        res.status(200).json({success:true, message:'User successfully created'})

    } catch (err) {
        res.status(500).json({success:false, message:'Internal Server Error. Try Again.'})

    }
};

export const login = async (req, res) => {

    const {email, password} = req.body;
    try {
        
        let user = null;

        const patient = await User.findOne({email})
        const hospital = await Hospital.findOne({email})

        if(patient){
            user = patient
        }
        if(hospital){
            user = hospital
        }

        //check if user exist
        if(!user){
            return res.status(404).json({message:'User not found'})
        }

        //compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

        if(!isPasswordMatch){
            return res.status(400).json({ status:false, message:'Invaid Credentials'});

        }

        //gettoken
        const token = generateToken(user);

        const {password, role, appointments, ...rest} = user._doc;

        res.status(200)
            .json({status: true, message:'Successfully login', token, data:{...rest}, role});

    } catch (err) {
        res.status(500).json({status:false, message:'Failed to login'})
    }
};