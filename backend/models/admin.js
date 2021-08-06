import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    registrationNumber: {
        type: String
    },
    department: {
        type: String
    },
    dob: {
        type: String
    },
    joiningYear: {
        type: String
    },
    // avatar: {
    //     type: String
    // },
    contactNumber: {
        type: String
    }

})

const Admin = new mongoose.model("admin",adminSchema);
export default Admin;