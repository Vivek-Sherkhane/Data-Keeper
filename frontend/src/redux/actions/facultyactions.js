import axios from "axios";
import jwt_decode from "jwt-decode";
import { SET_ERRORS } from "../constants/errorConstants";
import {
  FACULTY_GET_STUDENTS,
  FACULTY_GET_STUDENTS_ATTENDANCE,
  FACULTY_GET_STUDENTS_MARKS,
  FACULTY_GET_SUBJECT_CODE_LIST,
  FACULTY_HELPER,
  FACULTY_UPDATE_PROFILE,
  FACULTY_UPLOAD_MARKS_GET_STUDENTS,
  FACULTY_UPLOAD_MARKS_GET_SUBJECT_CODE_LIST,
  FACULTY_UPLOAD_MARKS_HELPER,
  SET_FACULTY,
} from "../constants/FacultyConstants";
import setToken from "../../utilities/SetToken.js";

export const facultyLogin = (facultyData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/faculty/login", facultyData);
    const { token } = data;
    localStorage.setItem("facultyJwtToken", token);
    setToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: SET_FACULTY,
      payload: decoded,
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const facultyUpdateProfile = (facultyData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "/api/faculty/updateprofile",
      facultyData
    );

    dispatch({
      type: FACULTY_UPDATE_PROFILE,
      payload: true,
    });
    alert("Kindly login again to see updates");
    dispatch(facultyLogout());
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const facultyLogout = () => (dispatch) => {
  localStorage.removeItem("facultyJwtToken");
  setToken(false);
  dispatch({
    type: SET_FACULTY,
  });
};

export const FacultyGetStudents = (studentData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/faculty/getstudents", studentData);
    dispatch({
      type: FACULTY_GET_STUDENTS,
      payload: data.result,
    });

    dispatch({
      type: FACULTY_GET_SUBJECT_CODE_LIST,
      payload: data.subjectCode,
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error,
    });
  }
};

export const FacultyUploadMarksGetStudents =
  (studentData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/api/faculty/getstudents",
        studentData
      );
      dispatch({
        type: FACULTY_UPLOAD_MARKS_GET_STUDENTS,
        payload: data.result,
      });

      dispatch({
        type: FACULTY_UPLOAD_MARKS_GET_SUBJECT_CODE_LIST,
        payload: data.subjectCode,
      });
    } catch (error) {
      dispatch({
        type: SET_ERRORS,
        payload: error,
      });
    }
  };

export const getSubjects = (subjectData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/faculty/getsubjects", subjectData);
    dispatch({
      type: FACULTY_UPLOAD_MARKS_GET_SUBJECT_CODE_LIST,
      payload: data.subjectCode,
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error,
    });
  }
};

export const FacultyMarkAttendence = (studentData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "/api/faculty/markattendence",
      studentData
    );
    alert("Attendence marked successfully.");
    dispatch({
      type: FACULTY_HELPER,
      payload: true,
    });
  } catch (error) {
    console.log("Error in marking attendence, faculty action", error.message);
  }
};

export const uploadMarks = (studentData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/faculty/uploadmarks", studentData);
    alert(data.message);
    dispatch({
      type: FACULTY_UPLOAD_MARKS_HELPER,
      payload: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const FacultyStudentsAttendance = (studentData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "/api/faculty/getstudentsattendance",
      studentData
    );
    console.log(data);
    dispatch({
      type: FACULTY_GET_STUDENTS_ATTENDANCE,
      payload: data,
    });
  } catch (error) {
    alert(error.response.data.message);
    dispatch({
      type: SET_ERRORS,
      payload: error,
    });
  }
};

export const FacultyStudentsMarks = (studentData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "/api/faculty/getstudentsmarks",
      studentData
    );
    if (data.length == 0) alert("No data to show");
    dispatch({
      type: FACULTY_GET_STUDENTS_MARKS,
      payload: data,
    });
  } catch (error) {
    alert(error.response.data.message);
    dispatch({
      type: SET_ERRORS,
      payload: error,
    });
  }
};
