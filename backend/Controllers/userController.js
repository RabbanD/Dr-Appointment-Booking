import User from '../models/UserSchema.js'
import Booking from '../models/BookingSchema.js'
import Hospital from '../models/HospitalSchema.js'

export const updateUser = async(req,res)=> {
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        res.status(200).json({success:true, message:'Successfully Updated', data: updatedUser})
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to Update'})

    }
}

export const deleteUser = async(req,res)=> {
    const id = req.params.id

    try {
        await User.findByIdAndDelete(
            id,
        );

        res.status(200).json({success:true, message:'Successfully Deleted'})
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to Delete'})

    }
}

export const getSingleUser = async(req,res)=> {
    const id = req.params.id

    try {
        const user = await User.findById(id).select("-password");

        res.status(200).json({success:true, 
            message:'User Found',
            data:user,
        })

    } catch (err) {
        res.status(404).json({success:false,
             message:'No user found'})

    }
}

export const getAllUser = async(req,res)=> {
    
    try {
        const users = await User.find({}).select("-password");

        res.status(200).json({success:true, 
            message:'Users Found',
            data:users,
        });

    } catch (err) {
        res.status(404).json({success:false,
             message:'Not found'});

    }
};

export const getUserProfile = async(req,res)=>{
    const userId = req.userId

    try {
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({success:false, message:'User Not Found'})
        }

        const {password, ...rest} = user._doc

        res.status(200).json({success:true, message:'Profile info is getting', data:{...rest}})
    } catch (error) {
        res.status(500).json({success:false, message:'Something went wrong, cannot get'});
    }
};

export const getMyAppointments = async(req, res) =>{
    try {
        //1. retrive appointment from booking
        const bookings = await Booking.find({user:req.userId})

        //2/ extract hospital ids from appointment bookings
        const hospitalIds = bookings.map(el=>el.hospital.id)

        //3. retrieve doctore using doctor ids
        const hospitals = await Hospital.find({_id: {$in:hospitalIds}}).select('-password')

        res.status(200).json({success:true, message:'Appointments are getting', data:hospitals})
    } catch (error) {
        res.status(500).json({success:false, message:'Something went wrong, cannot get'});
    }
}