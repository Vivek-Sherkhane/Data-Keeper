import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentLogin from "./pages/loginPages/StudentLogin";
import FacultyLogin from "./pages/loginPages/FacultyLogin";
import AdminLogin from "./pages/loginPages/AdminLogin";
import AdminHomePage from "./pages/homePages/AdminHomePage";
import MainNavbar from "./utilities/MainNavbar";
import AdminAddFaculty from "./pages/admin/AdminAddFaculty";
import AdminAddStudent from "./pages/admin/AdminAddStudent";
import AdminAddSubject from "./pages/admin/AdminAddSubject";
import AdminAddAdmin from "./pages/admin/AdminAddAdmin";
import AdminGetStudents from "./pages/admin/AdminGetStudents";
import AdminGetFaculties from "./pages/admin/AdminGetFaculties";
import AdminGetSubjects from "./pages/admin/AdminGetSubjects";
import FacultyHomePage from "./pages/homePages/FacultyHomePage";

// import { useDispatch } from 'react-redux';
import { adminLogin } from "./redux/actions/adminActions";
import jwt_decode from "jwt-decode";
import store from "./store";
import FacultyUpdateProfile from "./pages/faculty/FacultyUpdateProfile";
import FacultyMarkAttendance from "./pages/faculty/FacultyMarkAttendance";
import FacultyUploadMarks from "./pages/faculty/FacultyUploadMarks";
import StudentHomePage from "./pages/homePages/StudentHomePage";
import StudentUpdateProfile from "./pages/student/StudentUpdateProfile";
import StudentCheckAttendance from "./pages/student/StudentCheckAttendance";
import StudentGetMarks from "./pages/student/StudentGetMarks";
import AdminHostelHome from "./pages/admin/Hostel/AdminHostelHome";
import AdminAddRoom from "./pages/admin/Hostel/AdminAddRoom";
import AdminViewRoomDetails from "./pages/admin/Hostel/AdminViewRoomDetails";
import AdminEditRoom from "./pages/admin/Hostel/AdminEditRoom";
import FacultyGetStudentsDetails from "./pages/faculty/FacultyGetStudentsDetails";
import FacultyGetAttendance from "./pages/faculty/FacultyGetAttendance";
import FacultyGetMarks from "./pages/faculty/FacultyGetMarks";
import HomePage from "./components/HomePage";
import setToken from "./utilities/SetToken";
import { SET_ADMIN } from "./redux/constants/AdminConstants";
import { SET_FACULTY } from "./redux/constants/FacultyConstants";
import { SET_STUDENT } from "./redux/constants/StudentConstants";

function App() {
  if (window.localStorage.adminJwtToken) {
    setToken(localStorage.adminJwtToken);
    const decoded = jwt_decode(localStorage.adminJwtToken);

    store.dispatch({
      type: SET_ADMIN,
      payload: decoded,
    });
  } else if (window.localStorage.facultyJwtToken) {
    setToken(localStorage.facultyJwtToken);
    const decoded = jwt_decode(localStorage.facultyJwtToken);

    store.dispatch({
      type: SET_FACULTY,
      payload: decoded,
    });
  }
  if (window.localStorage.studentJwtToken) {
    setToken(localStorage.studentJwtToken);
    const decoded = jwt_decode(localStorage.studentJwtToken);

    store.dispatch({
      type: SET_STUDENT,
      payload: decoded,
    });
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/studentlogin" component={StudentLogin} />
          <Route exact path="/facultylogin" component={FacultyLogin} />
          <Route exact path="/adminlogin" component={AdminLogin} />
          <Route exact path="/adminhome" component={AdminHomePage} />
          <Route exact path="/admin/addFaculty" component={AdminAddFaculty} />
          <Route exact path="/admin/addStudent" component={AdminAddStudent} />
          <Route exact path="/admin/addSubject" component={AdminAddSubject} />
          <Route exact path="/admin/addAdmin" component={AdminAddAdmin} />
          <Route exact path="/admin/getStudents" component={AdminGetStudents} />
          <Route
            exact
            path="/admin/getFaculties"
            component={AdminGetFaculties}
          />
          <Route exact path="/admin/getSubjects" component={AdminGetSubjects} />
          <Route exact path="/facultyhome" component={FacultyHomePage} />
          <Route
            exact
            path="/faculty/updateprofile"
            component={FacultyUpdateProfile}
          />
          <Route
            exact
            path="/faculty/markattendance"
            component={FacultyMarkAttendance}
          />
          <Route
            exact
            path="/faculty/uploadmarks"
            component={FacultyUploadMarks}
          />
          <Route
            exact
            path="/faculty/studentsdetails"
            component={FacultyGetStudentsDetails}
          />
          <Route
            exact
            path="/faculty/getattendance"
            component={FacultyGetAttendance}
          />
          <Route exact path="/faculty/getmarks" component={FacultyGetMarks} />
          <Route exact path="/studenthome" component={StudentHomePage} />
          <Route
            exact
            path="/student/updateprofile"
            component={StudentUpdateProfile}
          />
          <Route
            exact
            path="/student/checkattendance"
            component={StudentCheckAttendance}
          />
          <Route exact path="/student/getmarks" component={StudentGetMarks} />
          <Route exact path="/admin/hostelhome" component={AdminHostelHome} />
          <Route exact path="/admin/addroom" component={AdminAddRoom} />
          <Route
            exact
            path="/admin/viewroom"
            component={AdminViewRoomDetails}
          />
          <Route exact path="/admin/editroom" component={AdminEditRoom} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
