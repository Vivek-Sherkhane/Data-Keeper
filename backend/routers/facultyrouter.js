import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import xlsx from "xlsx";

import validateFacultyLoginInput from "../validation/facultyLogin.js";

import Faculty from "../models/faculty.js";
import Subject from "../models/subject.js";
import Student from "../models/student.js";
import Attendence from "../models/attendence.js";
import Marks from "../models/marks.js";
import validateFetchStudentsInput from "../validation/facultyGetStudents.js";
import validateFacultyUploadMarks from "../validation/facultyUploadMarks.js";

const facultyRouter = express.Router();

facultyRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    try {
      const { errors, isValid } = validateFacultyLoginInput(req.body);
      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { registrationNumber, password } = req.body;

      const faculty = await Faculty.findOne({
        registrationNumber: registrationNumber,
      });
      if (!faculty) {
        errors.registrationNumber = "Registration number not found";
        return res.status(404).json(errors);
      }
      const isCorrect = await bcrypt.compare(password, faculty.password);
      if (!isCorrect) {
        errors.password = "Invalid Credentials";
        return res.status(404).json(errors);
      }
      const payload = {
        id: faculty.id,
        faculty,
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
    } catch (err) {
      console.log("Error in faculty login", err.message);
    }
  })
);

facultyRouter.post(
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

      await Faculty.findByIdAndUpdate(
        id,
        {
          $set: {
            name: name,
            gender: gender,
            facultyMobileNumber: contactNumber,
            aadharCard: aadharCard,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        },
        function (err, faculty) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(faculty);
          }
        }
      );
    } catch (error) {
      console.log("Error in updating Profile", error.message);
    }
  })
);

facultyRouter.post(
  "/getsubjects",
  expressAsyncHandler(async (req, res) => {
    try {
      const { department, year } = req.body;
      const subjectList = await Subject.find({ department, year });
      if (subjectList.length === 0) {
        errors.department = "No Subject found in given department";
        return res.status(404).json(errors);
      }
      res.status(200).json({
        subjectCode: subjectList.map((sub) => {
          return sub.subjectCode;
        }),
      });
    } catch (error) {
      console.log("error in faculty fetching subjects", error.message);
    }
  })
);

facultyRouter.post(
  "/getstudents",
  expressAsyncHandler(async (req, res) => {
    try {
      const { errors, isValid } = validateFetchStudentsInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { department, year, section } = req.body;
      const subjectList = await Subject.find({ department, year });
      if (subjectList.length === 0) {
        errors.department = "No Subject found in given department";
        return res.status(404).json(errors);
      }

      const students = await Student.find({ department, year, section });
      if (students.length === 0) {
        errors.department = "No Student found";
        return res.status(404).json(errors);
      }
      res.status(200).json({
        result: students.map((student) => {
          var student = {
            _id: student._id,
            registrationNumber: student.registrationNumber,
            name: student.name,
          };
          return student;
        }),
        subjectCode: subjectList.map((sub) => {
          return sub.subjectCode;
        }),
      });
    } catch (error) {
      console.log("error in faculty fetchStudents", error.message);
    }
  })
);

facultyRouter.post(
  "/markattendence",
  expressAsyncHandler(async (req, res) => {
    try {
      const { dataArray, subjectCode, department, year, section } = req.body;
      const sub = await Subject.findOne({ subjectCode });
      var presentStudents = [];
      for (let i = 0; i < dataArray.length; i++) {
        const item = await Student.findOne({
          registrationNumber: dataArray[i],
        });
        if (item) presentStudents.push(item);
      }
      // console.log("presentStudents", presentStudents);
      const allStudents = await Student.find({ department, year, section });

      // var filteredArr = allStudents.map((item) => {
      //   return !presentStudents.includes(item) ? item : null;
      // });
      const set1 = new Set();
      for (let i = 0; i < presentStudents.length; i++) {
        set1.add(presentStudents[i].registrationNumber);
      }
      var filteredArr = [];
      filteredArr = allStudents.filter(function (item) {
        //console.log("presentStudents", presentStudents);
        //console.log(set1.has(item.registrationNumber));
        return !set1.has(item.registrationNumber);
      });
      console.log("filteredStudents", filteredArr);

      for (let i = 0; i < filteredArr.length; i++) {
        const pre = await Attendence.findOne({
          student: filteredArr[i]._id,
          subject: sub._id,
        });
        if (!pre) {
          const attendence = new Attendence({
            student: filteredArr[i],
            subject: sub._id,
          });
          attendence.totalLecturesByFaculty =
            attendence.totalLecturesByFaculty + 1;
          await attendence.save();
        } else if (pre) {
          pre.totalLecturesByFaculty = pre.totalLecturesByFaculty + 1;
          await pre.save();
        }
      }
      for (var a = 0; a < presentStudents.length; a++) {
        const pre = await Attendence.findOne({
          student: presentStudents[a],
          subject: sub._id,
        });
        if (!pre) {
          const attendence = new Attendence({
            student: presentStudents[a],
            subject: sub._id,
          });
          attendence.totalLecturesByFaculty =
            attendence.totalLecturesByFaculty + 1;
          attendence.lectureAttended = attendence.lectureAttended + 1;
          await attendence.save();
        } else if (pre) {
          pre.totalLecturesByFaculty = pre.totalLecturesByFaculty + 1;
          pre.lectureAttended = pre.lectureAttended + 1;
          await pre.save();
        }
      }
      presentStudents = [];
      filteredArr = [];
      res.status(200).json({ message: "done" });
    } catch (error) {
      console.log("error", error.message);
      return res
        .status(400)
        .json({ message: `Error in marking attendence${error.message}` });
    }
  })
);

facultyRouter.post(
  "/getstudentsattendance",
  expressAsyncHandler(async (req, res) => {
    try {
      const { year, section, subjectCode, department } = req.body;
      const sub = await Subject.findOne({ subjectCode });
      if (!sub) {
        return res.status(400).json({
          message: "Wrong Subject Code.",
        });
      }
      if (sub.department !== department) {
        return res.status(400).json({
          message: `Not Authorised to access student details of other department.`,
        });
      }
      const attendanceDetails = await Attendence.find({
        subject: sub._id,
      })
        .populate("student")
        .populate("subject");
      const final = attendanceDetails.filter((item) => {
        return (
          item.student !== null &&
          item.student.year == year &&
          item.student.section == section
        );
      });
      return res.status(200).json(final);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error in fetching attendance details" });
    }
  })
);

facultyRouter.post(
  "/uploadmarks",
  expressAsyncHandler(async (req, res) => {
    try {
      const { errors, isValid } = validateFacultyUploadMarks(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const {
        subjectCode,
        exam,
        totalMarks,
        marks,
        department,
        year,
        section,
      } = req.body;

      var students = [];
      for (let i = 0; i < marks.length; i++) {
        const item = await Student.findOne({
          registrationNumber: marks[i].rollNo,
        });
        if (item) students.push(item);
      }
      //console.log("students : ", students);
      const subject = await Subject.findOne({ subjectCode });
      const isAlready = await Marks.find({
        exam: req.body.exam,
        department: req.body.department,
        section: req.body.section,
        subject: subject._id,
      });
      // console.log(isAlready);
      if (isAlready.length !== 0) {
        const result = await Marks.deleteMany({
          exam: req.body.exam,
          department: req.body.department,
          section: req.body.section,
          subject: subject._id,
        });
        // console.log(result);
      }
      for (var i = 0; i < marks.length; i++) {
        const newMarks = await new Marks({
          student: students[i]._id,
          subject: subject._id,
          exam,
          department,
          section,

          marks: marks[i].marks,
          totalMarks,
        });
        await newMarks.save();
      }
      res.status(200).json({ message: "Marks uploaded successfully" });
    } catch (error) {
      console.log("Error in uploading marks", error.message);
    }
  })
);

facultyRouter.post(
  "/getstudentsmarks",
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    try {
      const { year, department, exam, section, subjectCode } = req.body;

      const sub = await Subject.findOne({ subjectCode });
      if (!sub) {
        return res.status(400).json({
          message: "Wrong Subject Code.",
        });
      }
      if (sub.department !== department) {
        return res.status(400).json({
          message: `Not Authorised to access student details of other department.`,
        });
      }

      const marksDetails = await Marks.find({
        subject: sub._id,
        exam,
        section,
      })
        .populate("student")
        .populate("subject");

      const final = marksDetails.filter((item) => {
        return (
          item.student !== null &&
          item.student.year == year &&
          item.student.section == section
        );
      });
      return res.status(200).json(final);
    } catch {
      return res
        .status(400)
        .json({ message: "Error in fetching marks details" });
    }
  })
);

export default facultyRouter;
