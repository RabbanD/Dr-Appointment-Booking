import Review from "../models/ReviewSchema.js"
import Hospital from "../models/HospitalSchema.js"

//get all review
export const getAllReviews = async (req, res) => {

    try {
        const reviews = await Review.find({})

        res.status(200)
           .json({success:true, message:'Successful', data:reviews});
    } catch (err) {
        res.status(404).json({success:false, message:'Not Found'})
    }
};

//create review
export const createReview = async(req, res) => {
    if(!req.body.hospital) req.body.hospital = req.params.hospitalId
    if(!req.body.user) req.body.user = req.userId

    const newReview = new Review(req.body)

    try {
        const savedReview = await newReview.save();

        await Hospital.findByIdAndUpdate(req.body.hospital, {
            $push: {reviews: savedReview._id}
        })

        res.status(200).json({success:true, message:'Review submitted'});
    } catch (err) {
        res.status(500).json({success:false, message:err.message});

    }
}
