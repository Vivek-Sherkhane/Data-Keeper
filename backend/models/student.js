import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject'
        }
    ],
    fatherName: {
        type: String
    },
    aadharCard: {
        type: Number
    },
    gender: {
        type: String
    },
    registrationNumber: {
        type: String
    },
    department: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    batch: {
        type: String
    },
    dob: {
        type: String,
        required: true
    },
    studentMobileNumber: {
        type: Number
    },
    fatherMobileNumber: {
        type: Number
    },
    fatherName: {
        type: String
    },
    otp: {
       type:String
    }
});

const Student = new mongoose.model("student",studentSchema);
export default Student;