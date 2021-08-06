import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const StudentSideNavbar = (props) => {
  const studentUser = useSelector((state) => state.student);
  const history = useHistory();

  useEffect(() => {
    if (!studentUser) {
      history.push("/");
    }
  }, [studentUser]);
  return (
    <div>
      {studentUser.isAuthenticated ? (
        <>
          <div className="container-fluid">
            <div className="row">
              <nav className="navbar navigation-bar navbar-light bg-dark vh-100 ">
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse"  data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button> */}
                <div className="text-white navbar-container" id="navbarNav">
                  <ul className="nav navbar-nav">
                    <li className="nav-item active admin-navbar-item my-2">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/studenthome"
                          className="admin-navbar-item text-white"
                        >
                          <li>
                            {studentUser.student.student.name.toUpperCase()}
                          </li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item my-2">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/student/updateprofile"
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
                          to="/student/checkattendance"
                          className="admin-navbar-item text-white"
                        >
                          <li>CHECK ATTENDANCE</li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item my-2">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/student/getmarks"
                          className="admin-navbar-item text-white"
                        >
                          <li>CHECK MARKS</li>
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

export default StudentSideNavbar;
