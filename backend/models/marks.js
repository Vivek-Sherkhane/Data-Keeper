import mongoose from "mongoose";
const markSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
  },
  exam: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    default: 100,
  },
  department: {
    type: String,
  },
  // semester: {
  //     type:Number
  // },
  section: {
    type: String,
  },
});

const Marks = new mongoose.model("mark", markSchema);
export default Marks;
