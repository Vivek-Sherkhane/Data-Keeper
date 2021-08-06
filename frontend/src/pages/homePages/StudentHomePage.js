import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StudentHomeHelper from "../../components/StudentHomeHelper";
import StudentSideNavbar from "../../components/StudentSideNavbar";

function FacultyHomePage(props) {
  const studentUser = useSelector((state) => state.student);
  useEffect(() => {
    if (!studentUser) {
      props.history.push("/");
    }
  }, [studentUser]);

  return (
    <div>
      {studentUser.isAuthenticated ? (
        <>
          <div>
            <div className="hide-print header">
              <StudentHomeHelper />
            </div>
            <div style={{ height: "11vh" }}></div>

            <div className="container-fluid">
              <div className="row ">
                <div className="col-lg-3 col-md-4 col-sm-5 position-fixed sidebar">
                  <StudentSideNavbar />
                </div>
                <div className="col-lg-4 col-md-1 col-sm-1"></div>
                <div className="col-lg-7 col-md-7 col-sm-6 mt-5">
                  <div className="row">
                    <div className="col-md-7">
                      <table className="table border shadow">
                        <tbody>
                          <tr>
                            <td>Name</td>
                            <td>{studentUser.student.student.name}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{studentUser.student.student.email}</td>
                          </tr>
                          <tr>
                            <td>Registration Number</td>
                            <td>
                              {studentUser.student.student.registrationNumber}
                            </td>
                          </tr>
                          <tr>
                            <td>Date Of Birth</td>
                            <td>{studentUser.student.student.dob}</td>
                          </tr>
                          <tr>
                            <td>Year</td>
                            <td>{studentUser.student.student.year}</td>
                          </tr>
                          <tr>
                            <td>Department</td>
                            <td>{studentUser.student.student.department}</td>
                          </tr>
                          <tr>
                            <td>Section</td>
                            <td>{studentUser.student.student.section}</td>
                          </tr>
                          <tr>
                            <td>Batch</td>
                            <td>{studentUser.student.student.batch}</td>
                          </tr>
                          <tr>
                            <td>Gender</td>
                            <td>
                              {studentUser.student.student.gender
                                ? studentUser.student.student.gender
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td>Contact Number</td>
                            <td>
                              {studentUser.student.student.studentMobileNumber
                                ? studentUser.student.student
                                    .studentMobileNumber
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td>Aadhar Card</td>
                            <td>
                              {studentUser.student.student.aadharCard
                                ? studentUser.student.student.aadharCard
                                : "NA"}{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>Father Name</td>
                            <td>
                              {studentUser.student.student.fatherName
                                ? studentUser.student.student.fatherName
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td>Father Contact Number</td>
                            <td>
                              {studentUser.student.student.fatherMobileNumber
                                ? studentUser.student.student.fatherMobileNumber
                                : "NA"}
                            </td>
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
