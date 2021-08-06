//import {data} from '../../data.js'
import axios from "axios";
import jwt_decode from "jwt-decode";
import setToken from "../../utilities/SetToken.js";
import {
  ADMIN_ADD_ADMIN,
  ADMIN_ADD_FACULTY,
  ADMIN_ADD_STUDENT,
  ADMIN_ADD_SUBJECT,
  SET_ADMIN,
  ADMIN_GET_ALL_STUDENTS,
  ADMIN_GET_ALL_FACULTIES,
  ADMIN_GET_ALL_SUBJECTS,
  ADMIN_LOGOUT,
  ADMIN_ADD_ROOM,
  ADMIN_VIEW_ROOM,
  ADMIN_DELETE_ROOM,
  ADMIN_UPDATE_ROOM,
} from "../constants/AdminConstants.js";
import { RESET_ERRORS, SET_ERRORS } from "../constants/errorConstants.js";

export const adminLogin = (adminData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/admin/login", adminData);
      const { token } = data;
      localStorage.setItem("adminJwtToken", token);
      setToken(token);
      const decoded = jwt_decode(token);
      //console.log(decoded);
      dispatch({
        type: SET_ADMIN,
        payload: decoded,
      });
      localStorage.setItem("currentAdmin", JSON.stringify(decoded));
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const adminAddAdmin = (adminData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/admin/addAdmin", adminData);
      alert(data.message);
      dispatch({
        type: ADMIN_ADD_ADMIN,
        payload: true,
      });
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data.message);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const adminAddFaculty = (facultyData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/admin/addFaculty", facultyData);
    alert(data.message);
    dispatch({
      type: ADMIN_ADD_FACULTY,
      payload: true,
    });
  } catch (err) {
    alert(err.response.data.message);
    console.log(err.response.data.message);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const adminAddStudent = (studentData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/admin/addStudent", studentData);
    dispatch({
      type: ADMIN_ADD_STUDENT,
      payload: true,
    });
    alert("Student added successfully");
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const adminAddSubject = (subjectData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/admin/addSubject", subjectData);
    dispatch({
      type: ADMIN_ADD_SUBJECT,
      payload: true,
    });
    alert("Subject added successfully");
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const AdminGetAllStudents = (studentDetails) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/admin/getStudents", studentDetails);
    console.log(data);
    dispatch({
      type: ADMIN_GET_ALL_STUDENTS,
      payload: data.result,
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const AdminGetAllFaculties = (facultyDetails) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "/api/admin/getFaculties",
      facultyDetails
    );
    console.log(data);
    dispatch({
      type: ADMIN_GET_ALL_FACULTIES,
      payload: data.result,
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const AdminGetAllSubjects = (subjectDetails) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/admin/getSubjects", subjectDetails);
    console.log(data);
    dispatch({
      type: ADMIN_GET_ALL_SUBJECTS,
      payload: data.result,
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const AdminNewRoom = (roomData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/admin/addroom", roomData);
    alert(data.message);
    dispatch({
      type: ADMIN_ADD_ROOM,
      payload: true,
    });
  } catch (error) {
    console.log(error.response);
    alert(error.response.data.message);
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const AdminViewRoom = (roomData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/admin/viewroom", roomData);
    console.log(data);

    dispatch({
      type: ADMIN_VIEW_ROOM,
      payload: data.roomData,
    });
  } catch (error) {
    alert(error.response.data.room);
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const AdminDeleteRoom = (roomData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/admin/deleteroom", roomData);
    alert(data.message);
    dispatch({
      type: ADMIN_DELETE_ROOM,
      payload: true,
    });
  } catch (error) {
    alert(error.response.data.room);
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const AdminUpdateRoom = (roomData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/admin/updateroom", roomData);
    alert(data.message);
    dispatch({
      type: ADMIN_UPDATE_ROOM,
    });
  } catch (error) {
    alert(error.response.data.room);
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const AdminLogout = () => (dispatch) => {
  localStorage.removeItem("currentAdmin");
  localStorage.removeItem("adminJwtToken");
  setToken(false);
  dispatch({
    type: SET_ADMIN,
  });
};
