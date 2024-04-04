import Hospital from '../models/HospitalSchema.js'
import Booking from '../models/BookingSchema.js'

export const updateHospital = async(req,res)=> {
    const id = req.params.id

    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        res.status(200).json({success:true, message:'Successfully Updated', data: updatedHospital})
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to Update'})

    }
}

export const deleteHospital = async(req,res)=> {
    const id = req.params.id

    try {
        await Hospital.findByIdAndDelete(id);

        res.status(200).json({success:true, message:'Successfully Deleted'})
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to Delete'})

    }
}

export const getSingleHospital = async(req,res)=> {
    const id = req.params.id

    try {
        const hospital = await Hospital.findById(id)
        .populate("reviews")
        .select("-password");

        res.status(200).json({success:true, 
            message:'Hospital Found',
            data:hospital,
        })

    } catch (err) {
        res.status(404).json({success:false,
             message:'No hospital found'})

    }
}

export const getAllHospital = async(req,res)=> {
    
    try {

        const {query} = req.query;
        let hospitals;

        if(query){
            hospitals = await Hospital.find({isApproved: 'approved', $or:[{name:{$regex:query, $options: "i"}}, {specialization: {$regex: query, $options: "i"}}],
        }).select("-password");
        } else{
            hospitals = await Hospital.find({isApproved:"approved"}).select("-password");
        }

        res.status(200).json({success:true, 
            message:'Hospitals Found',
            data:hospitals,
        });

    } catch (err) {
        res.status(404).json({success:false,
             message:'Not found'});

    }
};

export const getHospitalProfile = async(req, res) => {
    const hospitalId = req.userId;

    try {
        const hospital = await Hospital.findById(hospitalId)

        if(!hospital){
            return res.status(404).json({success:false, message:'Hospital Not Found'})
        }

        const {password, ...rest} = hospital._doc;
        const appointments = await Booking.find({hospital:hospitalId})

        res.status(200).json({
            success:true, 
            message:'Profile info is getting', 
            data:{...rest, appointments},
        });
    } catch (error) {
        res.status(500).json({success:false, message:'Something went wrong, cannot get'});
    }
}