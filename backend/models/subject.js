import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true,
        trim: true
    },
    // totalLectures: {
    //     type: Number,
    //     default:30
    // },
    year: {
        type: String,
        required: true 
    },
    attendence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'attendence'
    }
});

const Subject = new mongoose.model("subject",subjectSchema);
export default Subject;