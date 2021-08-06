import mongoose from 'mongoose';


const attendenceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    },
    totalLecturesByFaculty: {
        type: Number,
        default:0
    },
    lectureAttended: {
        type: Number,
        default:0
    }
})

const Attendence = new mongoose.model("attendence",attendenceSchema);

export default Attendence;