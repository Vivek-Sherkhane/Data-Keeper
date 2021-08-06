import Validator from "validator";
import isEmpty from "./isEmpty.js";

const validateViewRoomInput = (data) => {
  let errors = {};
  data.hostel = !isEmpty(data.hostel) ? data.hostel : "";
  data.roomNo = !isEmpty(data.roomNo) ? data.roomNo : "";
  //data.totalLectures = !isEmpty(data.totalLectures) ? data.totalLectures : '';

  if (Validator.isEmpty(data.hostel)) {
    errors.hostelName = " Hostel Name field is required";
  }

  if (Validator.isEmpty(data.roomNo)) {
    errors.roomNo = "Room Number field is required";
  }

  // if (Validator.isEmpty(data.totalLectures)) {
  //     errors.totalLectures = 'Total Lecture field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateViewRoomInput;
