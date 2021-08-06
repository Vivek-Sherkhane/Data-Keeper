import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const AdminSideNavbar = (props) => {
  const adminUser = useSelector((state) => state.admin);
  const history = useHistory();
  const [activeLink, setActiveLink] = useState("");
  console.log(activeLink);
  useEffect(() => {
    if (!adminUser) {
      history.push("/");
    }
  }, [adminUser]);
  return (
    <div>
      {adminUser.isAuthenticated ? (
        <>
          <div className="container">
            <div className="row">
              <nav className="navbar navigation-bar navbar-light bg-dark vh-100">
                <div
                  className="text-white"
                  id="navbarNav"
                  style={{ width: "100%" }}
                >
                  <h4 className="navbar-brand text-white">ADMIN</h4>
                  <ul className="nav navbar-nav">
                    <li className="nav-item active admin-navbar-item">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/adminhome"
                          className="admin-navbar-item text-white"
                        >
                          {adminUser.admin.name.toUpperCase()}
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item pt-3">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/admin/addFaculty"
                          className="admin-navbar-item text-white"
                        >
                          ADD FACULTY
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item pt-3">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/admin/addStudent"
                          className="admin-navbar-item text-white"
                        >
                          <li>ADD STUDENT</li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item pt-3">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/admin/addSubject"
                          className="admin-navbar-item text-white"
                        >
                          <li>ADD SUBJECT</li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item pt-3">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/admin/addAdmin"
                          className="admin-navbar-item text-white"
                        >
                          <li>ADD ADMIN</li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item pt-3">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/admin/getFaculties"
                          className="admin-navbar-item text-white"
                        >
                          <li>FACULTIES</li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item pt-3">
                      <button type="button" className="btn">
                        <Link
                          exact
                          to="/admin/getStudents"
                          className="admin-navbar-item text-white"
                        >
                          <li>STUDENTS</li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item pt-3">
                      <button type="button" className="btn ">
                        <Link
                          exact
                          to="/admin/getSubjects"
                          className="admin-navbar-item text-white"
                        >
                          <li>SUBJECTS</li>
                        </Link>
                      </button>
                    </li>
                    <li className="nav-item admin-navbar-item pt-3">
                      <button type="button" className="btn ">
                        <Link
                          exact
                          to="/admin/hostelhome"
                          className="admin-navbar-item text-white"
                        >
                          <li>HOSTEL</li>
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

export default AdminSideNavbar;
