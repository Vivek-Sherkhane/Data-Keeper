import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../auth.js";

//validation
import { validateAdminLoginInput } from "../validation/adminLogin.js";
import { validateAdminRegisterInput } from "../validation/addAdmin.js";
import validateFacultyRegisterInput from "../validation/addFaculty.js";
import validateStudentRegisterInput from "../validation/addStudent.js";
import validateAddRoomInput from "../validation/addRoom.js";
import validateViewRoomInput from "../validation/viewRoom.js";
//models
import Admin from "../models/admin.js";
import Faculty from "../models/faculty.js";
import Student from "../models/student.js";
import Subject from "../models/subject.js";
import Hostel from "../models/hostel.js";
import validateSubjectRegisterInput from "../validation/addSubject.js";
import validateDeleteRoomInput from "../validation/deleteRoom.js";
import validateUpdateRoomInput from "../validation/updateRoom.js";
const adminRouter = express.Router();

adminRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    try {
      const { errors, isValid } = validateAdminLoginInput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { registrationNumber, password } = req.body;

      const admin = await Admin.findOne({ registrationNumber });
      if (!admin) {
        errors.registrationNumber = "Registration number not found";
        return res.status(404).json(errors);
      }
      console.log(password);
      const isCorrect = await bcrypt.compare(password, admin.password);
      if (!isCorrect) {
        errors.password = "Invalid Credentials";
        return res.status(404).json(errors);
      }
      const payload = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        contactNumber: admin.contactNumber,
        avatar: admin.avatar,
        registrationNumber: admin.registrationNumber,
        joiningYear: admin.joiningYear,
        department: admin.department,
      };
      jwt.sign(
        payload,
        `${process.env.JWT_SECRET}`,
        { expiresIn: 7200 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } catch (err) {
      console.log("Error in admin login", err.message);
    }
  })
);

adminRouter.post(
  "/addAdmin",
  expressAsyncHandler(async (req, res) => {
    try {
      // const { errors, isValid } = validateAdminRegisterInput(req.body);
      // if (!isValid) {
      //   return res.status(400).json(errors);
      // }
      const { department, adminData } = req.body;
      for (let i = 0; i < adminData.length; i++) {
        const { name, email, contactNumber, dob } = adminData[i];

        const admin = await Admin.findOne({ email });
        if (admin) {
          return res
            .status(400)
            .json({ message: `${email} email already exists` });
        }

        const newDob =
          dob.substring(8, 10) +
          "-" +
          dob.substring(5, 7) +
          "-" +
          dob.substring(0, 4);

        let departmentHelper;
        if (department === "C.S.E") {
          departmentHelper = "01";
        } else if (department === "E.C.E") {
          departmentHelper = "02";
        } else if (department === "I.T") {
          departmentHelper = "03";
        } else if (department === "Mechanical") {
          departmentHelper = "04";
        } else if (department === "Civil") {
          departmentHelper = "05";
        } else if (department === "E.E.E") {
          departmentHelper = "06";
        } else {
          departmentHelper = "00";
        }

        const admins = await Admin.find({ department });
        let helper;
        if (admins.length < 10) {
          helper = "00" + admins.length.toString();
        } else if (students.length < 100 && students.length > 9) {
          helper = "0" + admins.length.toString();
        } else {
          helper = admins.length.toString();
        }
        let hashedPassword;
        hashedPassword = await bcrypt.hash(newDob, 10);
        var date = new Date();
        const joiningYear = date.getFullYear();
        var components = ["ADM", date.getFullYear(), departmentHelper, helper];

        var registrationNumber = components.join("");
        const newAdmin = await new Admin({
          name,
          email,
          password: hashedPassword,
          joiningYear,
          registrationNumber,
          department,
          // avatar,
          contactNumber,
          dob: newDob,
        });
        await newAdmin.save();
      }
      res.status(200).json({ message: "admins added successfully" });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in adding new admin", ${err.message}` });
    }
  })
);

adminRouter.post(
  "/addFaculty",
  expressAsyncHandler(async (req, res) => {
    //console.log(req.body);
    try {
      // const { errors, isValid } = validateFacultyRegisterInput(req.body);

      // if (!isValid) {
      //   return res.status(400).json(errors);
      // }
      const { facultyData, department } = req.body;
      for (let i = 0; i < facultyData.length; i++) {
        const {
          name,
          email,
          designation,
          facultyMobileNumber,
          aadharCard,
          dob,
          gender,
        } = facultyData[i];
        const faculty = await Faculty.findOne({ email });
        if (faculty) {
          return res.status(400).json({ message: `${email} already exists ` });
        }

        const newDob =
          dob.substring(8, 10) +
          "-" +
          dob.substring(5, 7) +
          "-" +
          dob.substring(0, 4);

        let departmentHelper;
        if (department === "C.S.E") {
          departmentHelper = "01";
        } else if (department === "E.C.E") {
          departmentHelper = "02";
        } else if (department === "I.T") {
          departmentHelper = "03";
        } else if (department === "Mechanical") {
          departmentHelper = "04";
        } else if (department === "Civil") {
          departmentHelper = "05";
        } else {
          departmentHelper = "06";
        }

        const faculties = await Faculty.find({ department });
        let helper;
        if (faculties.length < 10) {
          helper = "00" + faculties.length.toString();
        } else if (faculties.length < 100 && faculties.length > 9) {
          helper = "0" + faculties.length.toString();
        } else {
          helper = faculties.length.toString();
        }
        let hashedPassword;
        hashedPassword = await bcrypt.hash(newDob, 10);
        var date = new Date();
        const joiningYear = date.getFullYear();
        var components = ["FAC", date.getFullYear(), departmentHelper, helper];

        var registrationNumber = components.join("");
        const newFaculty = await new Faculty({
          name,
          email,
          designation,
          password: hashedPassword,
          department,
          facultyMobileNumber,
          gender,
          aadharCard,
          registrationNumber,
          dob: newDob,
          joiningYear,
        });
        await newFaculty.save();
      }
      res.status(200).json({ message: "faculties added successfully" });
    } catch (err) {
      console.log("error", err.message);
      res
        .status(400)
        .json({ message: `error in adding new Faculty", ${err.message}` });
    }
  })
);

adminRouter.post(
  "/addStudent",
  expressAsyncHandler(async (req, res) => {
    //console.log(req.body);
    try {
      const { studentsData, year, department, section } = req.body;
      for (let i = 0; i < studentsData.length; i++) {
        const {
          name,
          email,
          aadharCard,
          dob,
          gender,
          studentMobileNumber,
          fatherName,
          fatherMobileNumber,
        } = studentsData[i];
        //console.log(studentsData[i]);
        const newDob =
          dob.substring(8, 10) +
          "-" +
          dob.substring(5, 7) +
          "-" +
          dob.substring(0, 4);
        // console.log(newDob);
        const student = await Student.findOne({ email });
        if (student) {
          errors.email = "Email already exist";
          return res.status(400).json(errors);
        }

        let departmentHelper;
        if (department === "C.S.E") {
          departmentHelper = "01";
        } else if (department === "E.C.E") {
          departmentHelper = "02";
        } else if (department === "I.T") {
          departmentHelper = "03";
        } else if (department === "Mechanical") {
          departmentHelper = "04";
        } else if (department === "Civil") {
          departmentHelper = "05";
        } else {
          departmentHelper = "06";
        }

        const students = await Student.find({ department });
        let helper;
        if (students.length < 10) {
          helper = "00" + students.length.toString();
        } else if (students.length < 100 && students.length > 9) {
          helper = "0" + students.length.toString();
        } else {
          helper = students.length.toString();
        }
        let hashedPassword;
        hashedPassword = await bcrypt.hash(newDob, 10);
        var date = new Date();
        const batch = date.getFullYear();
        var components = ["STU", date.getFullYear(), departmentHelper, helper];

        var registrationNumber = components.join("");
        const newStudent = await new Student({
          name,
          email,
          password: hashedPassword,
          year,
          fatherName,
          aadharCard,
          gender,
          registrationNumber,
          department,
          section,
          batch,
          dob: newDob,
          studentMobileNumber,
          fatherMobileNumber,
        });
        await newStudent.save();
        const subjects = await Subject.find({ year });
        if (subjects.length !== 0) {
          for (var j = 0; j < subjects.length; j++) {
            newStudent.subjects.push(subjects[j]._id);
          }
        }
        await newStudent.save();
      }
      res.status(200).json({ message: "students added successfully" });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in adding new student", ${err.message}` });
    }
  })
);

adminRouter.post(
  "/addSubject",
  expressAsyncHandler(async (req, res) => {
    try {
      const { errors, isValid } = validateSubjectRegisterInput(req.body);
      //Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { department, subjectCode, subjectName, year } = req.body;
      const subject = await Subject.findOne({ subjectCode });
      if (subject) {
        errors.subjectCode = "Given Subject is already added";
        return res.status(400).json(errors);
      }
      const newSubject = await new Subject({
        //totalLectures,
        department,
        subjectCode,
        subjectName,
        year,
      });
      await newSubject.save();
      const students = await Student.find({ department, year });
      if (students.length === 0) {
        errors.department = "No branch found for given subject";
        return res.status(400).json(errors);
      } else {
        for (var i = 0; i < students.length; i++) {
          students[i].subjects.push(newSubject._id);
          await students[i].save();
        }
        res.status(200).json({ newSubject });
      }
    } catch (err) {
      console.log(`error in adding new subject", ${err.message}`);
    }
  })
);

adminRouter.post(
  "/getStudents",
  expressAsyncHandler(async (req, res) => {
    try {
      const { department, year } = req.body;
      const students = await Student.find({
        $and: [{ department: department }, { year: year }],
      });
      if (students.length === 0) {
        return res.status(404).json({ message: "No students found" });
      }
      res.status(200).json({ result: students });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting all student", ${err.message}` });
    }
  })
);

adminRouter.post(
  "/getFaculties",
  expressAsyncHandler(async (req, res) => {
    try {
      const { department } = req.body;
      const faculties = await Faculty.find({ department: department });
      if (faculties.length === 0) {
        return res.status(404).json({ message: "No Faculty found" });
      }
      res.status(200).json({ result: faculties });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting Faculty data", ${err.message}` });
    }
  })
);

adminRouter.post(
  "/getSubjects",
  expressAsyncHandler(async (req, res) => {
    try {
      const { department, year } = req.body;
      const subjects = await Subject.find({
        $and: [{ department: department }, { year: year }],
      });
      if (subjects.length === 0) {
        return res.status(404).json({ message: "No subjects found" });
      }
      res.status(200).json({ result: subjects });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting subject data", ${err.message}` });
    }
  })
);

adminRouter.post(
  "/addroom",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { hostelName, roomData } = req.body;
      for (let i = 0; i < roomData.length; i++) {
        const { roomNo, occupancy, studentRegNumber } = roomData[i];
        const student = await Student.findOne({
          registrationNumber: studentRegNumber,
        });
        if (!student) {
          return res.status(400).json({
            message: `Student with  registration number ${studentregNumber} does not exist`,
          });
        }

        const room = await Hostel.findOne({ hostelName, roomNo });
        if (room) {
          return res
            .status(400)
            .json({ message: `Room Number ${roomNo} already exists.` });
        }

        const newRoom = await new Hostel({
          student: student._id,
          hostelName,
          roomNo,
          occupancy,
        });
        await newRoom.save();
      }
      res.status(200).json({ message: "new Rooms added successfully!" });
    } catch (err) {
      return res
        .status(400)
        .json({ message: `error in adding new room", ${err.message}` });
    }
  })
);

adminRouter.post(
  "/viewroom",
  expressAsyncHandler(async (req, res) => {
    try {
      const { errors, isValid } = validateViewRoomInput(req.body);
      //Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { hostel, roomNo } = req.body;
      const room = await Hostel.findOne({
        hostelName: hostel,
        roomNo: roomNo,
      }).populate("student");
      if (!room) {
        errors.room = "Room does not exist";
        return res.status(400).json(errors);
      }

      return res.status(200).json({ roomData: room });
    } catch (err) {
      return res
        .status(400)
        .json({ message: `error in adding new room", ${err.message}` });
    }
  })
);

adminRouter.post(
  "/deleteroom",
  expressAsyncHandler(async (req, res) => {
    try {
      const { errors, isValid } = validateDeleteRoomInput(req.body);
      //Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { hostel, roomNo } = req.body;
      const room = await Hostel.findOne({
        hostelName: hostel,
        roomNo: roomNo,
      });
      if (!room) {
        errors.room = "Room does not exist";
        return res.status(400).json(errors);
      }
      const roomData = await Hostel.findOneAndDelete({
        hostelName: hostel,
        roomNo: roomNo,
      });
      if (roomData)
        return res.status(200).json({ message: "Room deleted Successfully" });
    } catch (err) {
      return res
        .status(400)
        .json({ message: `error in deleting room", ${err.message}` });
    }
  })
);

adminRouter.post(
  "/updateroom",
  expressAsyncHandler(async (req, res) => {
    try {
      const { errors, isValid } = validateUpdateRoomInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { hostel, roomNo, studentRegNumber } = req.body;
      const room = await Hostel.findOne({
        hostelName: hostel,
        roomNo: roomNo,
      });
      if (!room) {
        errors.room = "Room does not exist";
        return res.status(400).json(errors);
      }

      const studentData = await Student.findOne({
        registrationNumber: studentRegNumber,
      });
      if (!studentData) {
        errors.studentRegistrationNumber =
          "Invalid student Registration Number ";
        return res.status(400).json(errors);
      }

      const id = room._id;
      await Hostel.findByIdAndUpdate(
        id,
        {
          $set: {
            student: studentData._id,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        },
        function (err, student) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json({ message: "Room Data updated Successfully" });
          }
        }
      );
    } catch (error) {
      return res
        .status(400)
        .json({ message: `error in updating room", ${error.message}` });
    }
  })
);

export default adminRouter;
