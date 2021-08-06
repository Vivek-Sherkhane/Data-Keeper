import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import adminReducer from "./redux/reducer/adminReducer";
import setErrors from "./redux/reducer/errorReducer";
import facultyReducer from "./redux/reducer/facultyReducer";
import studentReducer from "./redux/reducer/studentReducer";

const initialState = {
  // admin : {
  //   currentAdmin : localStorage.getItem('currentAdmin') ? JSON.parse(localStorage.getItem('currentAdmin')) : null,
  //   studentList : [],
  //   facultyList : [],
  //   subjectList : [],
  // }
};

const reducer = combineReducers({
  admin: adminReducer,
  faculty: facultyReducer,
  student: studentReducer,
  error: setErrors,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
