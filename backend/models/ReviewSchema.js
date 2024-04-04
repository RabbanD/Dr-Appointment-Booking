import mongoose from "mongoose";
import Hospital from "./HospitalSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Types.ObjectId,
      ref: "Hospital",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function(next){
  this.populate({
    path:"user",
    select:"name photo",
  });
  next();
})

reviewSchema.statics.calcAverageRatings = async function(hospitalId){
  const stats = await this.aggregate([{
    $match:{hospital:hospitalId}
  },
  {
    $group:{
      _id:'$hospital',
      numOfRating:{$sum:1},
      avgRating:{$avg:'$rating'}
    }
  }
]);
  await Hospital.findByIdAndUpdate(hospitalId, {
    totalRating: stats[0].numOfRating,
    averageRating:stats[0].avgRating,
  })
}
reviewSchema.post('save', function(){
  this.constructor.calcAverageRatings(this.hospital);
})

export default mongoose.model("Review", reviewSchema);