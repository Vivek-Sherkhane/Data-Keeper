import Validator from "validator";
import isEmpty from "./isEmpty.js";

const validateUpdateRoomInput = (data) => {
  let errors = {};
  data.hostelName = !isEmpty(data.hostel) ? data.hostel : "";
  data.roomNo = !isEmpty(data.roomNo) ? data.roomNo : "";
  data.studentRegNumber = !isEmpty(data.studentRegNumber)
    ? data.studentRegNumber
    : "";

  //data.totalLectures = !isEmpty(data.totalLectures) ? data.totalLectures : '';

  if (Validator.isEmpty(data.hostelName)) {
    errors.hostel = " Hostel Name field is required";
  }

  if (Validator.isEmpty(data.roomNo)) {
    errors.roomNumber = "Room Number field is required";
  }

  if (Validator.isEmpty(data.studentRegNumber)) {
    errors.studentRegistrationNumber =
      "Student Registration Number field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateUpdateRoomInput;
