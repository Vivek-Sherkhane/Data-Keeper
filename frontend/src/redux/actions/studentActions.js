import axios from "axios";
import jwt_decode from "jwt-decode";
import { SET_ERRORS } from "../constants/errorConstants";
import setToken from "../../utilities/SetToken.js";
import {
  SET_STUDENT,
  STUDENT_GET_ATTENDANCE,
  STUDENT_GET_MARKS,
  STUDENT_UPDATE_PROFILE,
} from "../constants/StudentConstants";

export const studentLogin = (studentData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/student/login", studentData);
    const { token } = data;
    localStorage.setItem("studentJwtToken", token);
    setToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: SET_STUDENT,
      payload: decoded,
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const studentLogout = () => (dispatch) => {
  localStorage.removeItem("studentJwtToken");
  setToken(false);
  dispatch({
    type: SET_STUDENT,
  });
};

export const studentUpdateProfile = (studentData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "/api/student/updateprofile",
      studentData
    );
    dispatch({
      type: STUDENT_UPDATE_PROFILE,
      payload: true,
    });
    alert("Kindly login again to see updates");
    dispatch(studentLogout());
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const studentGetAttendence = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/student/getattendance");
    dispatch({
      type: STUDENT_GET_ATTENDANCE,
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message,
    });
  }
};

export const studentFetchMarks = (exam) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/student/getmarks", exam);
    dispatch({
      type: STUDENT_GET_MARKS,
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message,
    });
  }
};
