import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
    },
    registrationNumber: {
        type: String,
    },
    gender: {
        type: String,
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String, 
        required: true
    },
    facultyMobileNumber: {
        type: Number
    },
    aadharCard: {
        type: Number
    },
    dob: {
        type: String,
        required: true
    },
    joiningYear: {
        type: Number,
        required: true 
    },
    subjectsCanTeach: [{
        type: String
    }],
    otp: {
        type: String
    }
});

const Faculty = new mongoose.model("faculty",facultySchema);
export default Faculty;