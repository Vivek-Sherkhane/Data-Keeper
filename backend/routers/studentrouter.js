import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../auth.js";

import Student from "../models/student.js";
import Attendence from "../models/attendence.js";
import Marks from "../models/marks.js";
import validateStudentLoginInput from "../validation/studentLogin.js";

const studentRouter = express.Router();

studentRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    try {
      const { errors, isValid } = validateStudentLoginInput(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { registrationNumber, password } = req.body;

      const student = await Student.findOne({
        registrationNumber: registrationNumber,
      });
      if (!student) {
        errors.registrationNumber = "Registration number not found";
        return res.status(404).json(errors);
      }
      const isCorrect = await bcrypt.compare(password, student.password);
      if (!isCorrect) {
        errors.password = "Invalid Credentials";
        return res.status(404).json(errors);
      }
      const payload = {
        id: student.id,
        student,
      };
      jwt.sign(
        payload,
        `${process.env.JWT_SECRET}`,
        { expiresIn: 3600 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } catch (error) {
      console.log("Error in student login", error.message);
    }
  })
);

studentRouter.post(
  "/updateprofile",
  expressAsyncHandler(async (req, res) => {
    try {
      const { name, gender, contactNumber, aadharCard, id } = req.body;
      // const userPostImg = await bufferConversion(req.file.originalname, req.file.buffer)
      // const imgResponse = await cloudinary.uploader.upload(userPostImg)
      //const faculty = await Faculty.findOne({ registrationNumber })
      //res.send(faculty);
      // if(!faculty){

      //     return res.status(404).send('Registration number not found');
      // }
      // if(name){
      //     faculty.name = name
      //     await faculty.save();
      // }
      // if (gender) {
      //     faculty.gender = gender
      //     await faculty.save()
      // }
      // if (facultyMobileNumber) {
      //     faculty.facultyMobileNumber = facultyMobileNumber
      //     await faculty.save()
      // }
      // if (aadharCard) {
      //     faculty.aadharCard = aadharCard
      //     await faculty.save()
      // }
      // //faculty.avatar = imgResponse.secure_url
      // await faculty.save()
      // res.status(200).json(faculty)

      await Student.findByIdAndUpdate(
        id,
        {
          $set: {
            name: name,
            gender: gender,
            studentMobileNumber: contactNumber,
            aadharCard: aadharCard,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        },
        function (err, student) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(student);
          }
        }
      );
    } catch (error) {
      console.log("Error in updating Profile", error.message);
    }
  })
);

studentRouter.get(
  "/getattendance",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      // console.log(req);
      const studentId = req.user.id;
      //console.log(studentId);
      const attendance = await Attendence.find({ student: studentId }).populate(
        "subject"
      );
      if (!attendance) {
        res
          .status(400)
          .json({ message: `Error in fetching attendence${error.message}` });
      }
      res.status(200).json({
        result: attendance.map((item) => {
          let res = {};
          res.attendence = (
            (item.lectureAttended / item.totalLecturesByFaculty) *
            100
          ).toFixed(2);
          res.subjectCode = item.subject.subjectCode;
          res.subjectName = item.subject.subjectName;
          res.absentHours = item.totalLecturesByFaculty - item.lectureAttended;
          res.lectureAttended = item.lectureAttended;
          res.totalLecturesByFaculty = item.totalLecturesByFaculty;
          return res;
        }),
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Error in fetching attendence${error.message}` });
    }
  })
);

studentRouter.post(
  "/getmarks",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { department, _id } = req.user.student;
      const { exam } = req.body;

      const marks = await Marks.find({
        department,
        student: _id,
        exam,
      }).populate("subject");
      res.status(200).json({
        result: marks.map((item) => {
          let res = {};
          res.marks = item.marks;
          res.totalMarks = item.totalMarks;
          res.subjectCode = item.subject.subjectCode;
          res.subjectName = item.subject.subjectName;
          res.exam = item.exam;
          return res;
        }),
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Error in fetching attendence${error.message}` });
    }
  })
);

export default studentRouter;
