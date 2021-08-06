import Validator from "validator";
import isEmpty from "./isEmpty.js";

const validateAddRoomInput = (data) => {
  let errors = {};
  data.hostelName = !isEmpty(data.hostelName) ? data.hostelName : "";
  data.roomNo = !isEmpty(data.roomNo) ? data.roomNo : "";
  data.studentRegNumber = !isEmpty(data.studentRegNumber)
    ? data.studentRegNumber
    : "";
  data.occupancy = !isEmpty(data.occupancy) ? data.occupancy : "";
  //data.totalLectures = !isEmpty(data.totalLectures) ? data.totalLectures : '';

  if (Validator.isEmpty(data.hostelName)) {
    errors.hostelName = " Hostel Name field is required";
  }

  if (Validator.isEmpty(data.roomNo)) {
    errors.roomNo = "Room Number field is required";
  }

  if (Validator.isEmpty(data.studentRegNumber)) {
    errors.studentRegNumber = "Student REgistration Number field is required";
  }

  if (Validator.isEmpty(data.occupancy)) {
    errors.occupancy = "Occupancy field is required";
  }

  // if (Validator.isEmpty(data.totalLectures)) {
  //     errors.totalLectures = 'Total Lecture field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAddRoomInput;
