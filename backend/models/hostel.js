import mongoose from "mongoose";
const hostelSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  hostelName: {
    type: String,
    required: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  occupancy: {
    type: String,
    required: true,
  },
});

const Hostel = new mongoose.model("hostel", hostelSchema);
export default Hostel;
