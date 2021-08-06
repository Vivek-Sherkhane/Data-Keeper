import {
  ADMIN_ADD_ADMIN,
  ADMIN_ADD_FACULTY,
  ADMIN_ADD_ROOM,
  ADMIN_ADD_STUDENT,
  ADMIN_ADD_SUBJECT,
  ADMIN_DELETE_ROOM,
  ADMIN_GET_ALL_FACULTIES,
  ADMIN_GET_ALL_STUDENTS,
  ADMIN_GET_ALL_SUBJECTS,
  ADMIN_LOGOUT,
  ADMIN_UPDATE_ROOM,
  ADMIN_VIEW_ROOM,
  SET_ADMIN,
} from "../constants/AdminConstants";
import isEmpty from "../../validation/isEmpty";

const initialState = {
  isAuthenticated: false,
  admin: {},
  isloading: true,
  adminAddAdmin: false,
  adminAddFaculty: false,
  adminAddStudent: false,
  adminAddSubject: false,
  studentList: [],
  facultyList: [],
  subjectList: [],
  roomDetails: {},
  deleteRoom: false,
  addRoom: false,
  // addRoomHelper : false
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        admin: action.payload,
        roomDetails: {},
        addRoom: false,
        deleteRoom: false,
      };

    case ADMIN_ADD_ADMIN:
      return {
        ...state,
        adminAddAdmin: action.payload,
      };

    case ADMIN_ADD_FACULTY:
      return {
        ...state,
        adminAddFaculty: action.payload,
      };

    case ADMIN_ADD_STUDENT:
      return {
        ...state,
        adminAddStudent: action.payload,
      };

    case ADMIN_ADD_SUBJECT:
      return {
        ...state,
        adminAddSubject: action.payload,
      };

    case ADMIN_GET_ALL_STUDENTS:
      return {
        ...state,
        studentList: action.payload,
      };

    case ADMIN_GET_ALL_FACULTIES:
      return {
        ...state,
        facultyList: action.payload,
      };

    case ADMIN_GET_ALL_SUBJECTS:
      return {
        ...state,
        subjectList: action.payload,
      };

    case ADMIN_VIEW_ROOM:
      return {
        ...state,
        roomDetails: action.payload,
      };

    case ADMIN_ADD_ROOM:
      return {
        ...state,
        addRoom: action.payload,
      };

    case ADMIN_DELETE_ROOM:
      return {
        ...state,
        deleteRoom: action.payload,
      };
    case ADMIN_UPDATE_ROOM:
      return {
        ...state,
      };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default adminReducer;
