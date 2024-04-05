import mongoose from 'mongoose';

const SchemeSchema = new mongoose.Schema({
  schemeName: { type: String, required: true },
  rationCardColor: { type: String, required: true },
  state: { type: String, required: true },
  districts: [{ type: String }],
  hospitals: [{ type: mongoose.Types.ObjectId, ref: 'Hospital' }]
});

export default mongoose.model('Scheme', SchemeSchema);

const MahatmaYojana = new Scheme({
  schemeName: 'MahatmaYojana',
  rationCardColor: 'any',
  state: 'Maharashtra',
  districts: ['Amaravati', 'Aurangabad', 'Akola', 'Buldhana', 'Hingoli', 'Beed', 'Jalna', 'Latur', 'Nanded', 'Osmanabad', 'Wardha', 'Parbhani', 'Yavatmal', 'Washim'],
  hospitals: [yashodharaHospitalId] // Assuming yashodharaHospitalId is the ObjectId of the 'Yashodhara' hospital
});

MahatmaYojana.save();
