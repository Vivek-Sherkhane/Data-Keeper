import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const FacultySideNavbar = (props) => {
  const facultyUser = useSelector((state) => state.faculty);
  //const currentAdmin = localStorage.getItem('currentAdmin') ? JSON.parse(localStorage.getItem('currentAdmin')) : null

  // const {isloading,admin,error} = adminUser;
  const history = useHistory();

  // const [name, setName] = useState("");
  // useEffect(() => {

  //     if (currentAdmin) {
  //         setName(currentAdmin.name);
  //     }
  // }, [currentAdmin])

  useEffect(() => {
    if (!facultyUser) {
      history.push("/");
    }
  }, [facultyUser]);
  return (
    <div>
      {facultyUser.isAuthenticated ? (
        <>
          <div className="container-fluid">
            <div className="row">
              <nav className="navbar navigation-bar navbar-light bg-dark vh-100 ">
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse"  data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button> */}
                <div className="text-white navbar-container" id="navbarNav">
                  <h4 className="navbar-brand text-white">FACULTY</h4>
                  <ul className="nav navbar-nav">
                    <li className="nav-item active admin-navbar-item my-2">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/facultyhome"
                          className="admin-navbar-item text-white"
                        >
                          <li>
                            {facultyUser.faculty.faculty.name.toUpperCase()}
                          </li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item my-2">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/faculty/updateprofile"
                          className="admin-navbar-item text-white"
                        >
                          <li>UPADTE PROFILE</li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item my-2">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/faculty/markattendance"
                          className="admin-navbar-item text-white"
                        >
                          <li>MARK ATTENDANCE</li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item my-2">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/faculty/uploadmarks"
                          className="admin-navbar-item text-white"
                        >
                          <li>UPLOAD MARKS</li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item my-2">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/faculty/studentsdetails"
                          className="admin-navbar-item text-white"
                        >
                          <li>STUDENTS DETAILS</li>
                        </Link>
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default FacultySideNavbar;
