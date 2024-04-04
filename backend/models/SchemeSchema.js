import mongoose from "mongoose";

const SchemeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  state: {type: String},
  district: {type: String},
  taluka: {type: String},
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  disease: {type: String, enum: ["covid19", "tuberculosis", "poliomyelitis"] },
  annualIncome: {type: String, enum: ["1lakh", "3to4", "4to7"]},
  rationcard: {type:String, enum:["orange","yellow","white"]},
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Scheme", SchemeSchema);