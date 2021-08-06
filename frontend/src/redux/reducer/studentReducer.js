import isEmpty from "../../validation/isEmpty";
import {
  SET_STUDENT,
  STUDENT_GET_ATTENDANCE,
  STUDENT_GET_MARKS,
  STUDENT_LOGOUT,
  STUDENT_UPDATE_PROFILE,
} from "../constants/StudentConstants";

const initialState = {
  isAuthenticated: false,
  updateProfile: false,
  student: {},
  alongsideStudent: {},
  flag: false,
  regNumStudent: {},
  allSubjects: [],
  attendence: [],
  allMarks: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENT:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        student: action.payload,
        allSubjects: [],
        allMarks: [],
        attendence: [],
      };
    case STUDENT_UPDATE_PROFILE:
      return {
        ...state,
        updateProfile: action.payload,
      };

    case STUDENT_GET_ATTENDANCE:
      return {
        ...state,
        attendence: action.payload,
      };

    case STUDENT_GET_MARKS:
      return {
        ...state,
        allMarks: action.payload,
      };

    default:
      return state;
  }
};

export default studentReducer;
