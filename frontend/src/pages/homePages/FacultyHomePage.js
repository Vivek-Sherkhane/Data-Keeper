import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FacultyHomeHelper from "../../components/FacultyHomeHelper";
import FacultySideNavbar from "../../components/FacultySideNavbar";

function FacultyHomePage(props) {
  const facultyUser = useSelector((state) => state.faculty);
  //console.log("facultyUser : ",facultyUser);
  useEffect(() => {
    if (!facultyUser) {
      props.history.push("/");
    }
  }, [facultyUser]);
  // const currentAdmin = localStorage.getItem('currentAdmin') ? JSON.parse(localStorage.getItem('currentAdmin')) : null
  //console.log(currentAdmin);

  return (
    <div>
      {facultyUser.isAuthenticated ? (
        <>
          <div>
            <div className="hide-print header">
              <FacultyHomeHelper />
            </div>
            <div style={{ height: "11vh" }}></div>
            <div className="container-fluid">
              <div className="row ">
                <div className="col-lg-3 col-md-4 col-sm-5 position-fixed sidebar">
                  <FacultySideNavbar />
                </div>
                <div className="col-lg-4 col-md-1 col-sm-1"></div>
                <div className="col-lg-8 col-md-7 col-sm-6 mt-5">
                  <div className="row">
                    <div className="col-md-7 shadow">
                      <table className="table border ">
                        <tbody>
                          <tr>
                            <td>Name</td>
                            <td>{facultyUser.faculty.faculty.name}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{facultyUser.faculty.faculty.email}</td>
                          </tr>
                          <tr>
                            <td>Registration Number</td>
                            <td>
                              {facultyUser.faculty.faculty.registrationNumber}
                            </td>
                          </tr>
                          <tr>
                            <td>Department</td>
                            <td>{facultyUser.faculty.faculty.department}</td>
                          </tr>
                          <tr>
                            <td>Designation</td>
                            <td>{facultyUser.faculty.faculty.designation}</td>
                          </tr>
                          <tr>
                            <td>Joining Year</td>
                            <td>{facultyUser.faculty.faculty.joiningYear}</td>
                          </tr>
                          <tr>
                            <td>Contact Number</td>
                            <td>
                              {facultyUser.faculty.faculty.facultyMobileNumber
                                ? facultyUser.faculty.faculty
                                    .facultyMobileNumber
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td>Date of Birth</td>
                            <td>{facultyUser.faculty.faculty.dob}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-2"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        props.history.push("/")
      )}
    </div>
  );
}

export default FacultyHomePage;
