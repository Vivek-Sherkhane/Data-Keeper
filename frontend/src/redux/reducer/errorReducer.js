import { RESET_ERRORS, SET_ERRORS } from "../constants/errorConstants";

const initialState = {};

const setErrors = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload;
    case RESET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default setErrors;
