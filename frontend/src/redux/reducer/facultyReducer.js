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
import isEmpty from "../../validation/isEmpty";

const initialState = {
  isAuthenticated: false,
  faculty: {},
  flag: false,
  updateProfile: false,
  subjectCodeList: [],
  studentsList: [],
  fetchedStudentsHelper: true,
  uploadMarksFetchedStudentsHelper: true,
  uploadMarksSubjectCodeList: [],
  uploadMarksStudentsList: [],
  marksUploadedSuccessfullyHelper: false,
  studentAttendanceDetails: [],
  studentsMarksDetails: [],
};

const facultyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FACULTY:
      return {
        isAuthenticated: !isEmpty(action.payload),
        faculty: action.payload,
        flag: false,
        updateProfile: false,
        subjectCodeList: [],
        studentsList: [],
        fetchedStudentsHelper: true,
        uploadMarksFetchedStudentsHelper: true,
        uploadMarksSubjectCodeList: [],
        uploadMarksStudentsList: [],
        marksUploadedSuccessfullyHelper: false,
        studentAttendanceDetails: [],
        studentsMarksDetails: [],
      };

    case FACULTY_UPDATE_PROFILE:
      return {
        ...state,
        updateProfile: action.payload,
      };

    case FACULTY_GET_STUDENTS:
      return {
        ...state,
        fetchedStudentsHelper: false,
        studentsList: action.payload,
      };

    case FACULTY_GET_SUBJECT_CODE_LIST:
      return {
        ...state,
        subjectCodeList: action.payload,
      };

    case FACULTY_HELPER:
      return {
        ...state,
        fetchedStudentsHelper: action.payload,
        marksUploadedSuccessfullyHelper: true,
      };

    case FACULTY_UPLOAD_MARKS_GET_STUDENTS:
      return {
        ...state,
        uploadMarksFetchedStudentsHelper: false,
        uploadMarksStudentsList: action.payload,
      };

    case FACULTY_UPLOAD_MARKS_GET_SUBJECT_CODE_LIST:
      return {
        ...state,
        uploadMarksSubjectCodeList: action.payload,
      };

    case FACULTY_UPLOAD_MARKS_HELPER:
      return {
        ...state,
        uploadMarksFetchedStudentsHelper: action.payload,
      };
    case FACULTY_GET_STUDENTS_ATTENDANCE:
      return {
        ...state,
        studentAttendanceDetails: action.payload,
      };

    case FACULTY_GET_STUDENTS_MARKS:
      return {
        ...state,
        studentsMarksDetails: action.payload,
      };
    default:
      return state;
  }
};

export default facultyReducer;
