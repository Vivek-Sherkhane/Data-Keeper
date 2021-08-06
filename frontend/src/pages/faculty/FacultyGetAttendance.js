import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import FacultySideNavbar from "../../components/FacultySideNavbar";
import FacultyHomeHelper from "../../components/FacultyHomeHelper";
import isEmpty from "../../validation/isEmpty";
import { FacultyStudentsAttendance } from "../../redux/actions/facultyactions";

function FacultyGetAttendance(props) {
  const facultyUser = useSelector((state) => state.faculty);
  const storeError = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const [subjectCode, setSubjectCode] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [error, setError] = useState({});
  const [studentdetails, setStudentDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStudentDetails(false);
    dispatch(
      FacultyStudentsAttendance({
        year,
        section,
        subjectCode,
        department: facultyUser.faculty.faculty.department,
      })
    );
  };

  useEffect(() => {
    if (!isEmpty(facultyUser.studentAttendanceDetails)) {
      console.log(facultyUser.studentAttendanceDetails);
      setIsLoading(false);
      setStudentDetails(true);
    }
  }, [facultyUser.studentAttendanceDetails]);

  useEffect(() => {
    if (storeError) setIsLoading(false);
  }, [storeError]);

  return (
    <div>
      {facultyUser.isAuthenticated ? (
        <>
          <div className="hide-print header">
            <FacultyHomeHelper />
          </div>
          <div style={{ height: "11vh" }}></div>
          <div className="container-fluid">
            <div className="row ">
              <div className="col-lg-3 col-md-3 col-sm-3 hide-print position-fixed sidebar">
                <FacultySideNavbar />
              </div>
              <div className="col-lg-4 col-md-2"></div>
              <div className="col-lg-6 mt-5">
                <form noValidate onSubmit={formHandler} className="hide-print">
                  <div className="form-group my-2">
                    <label htmlFor="subjectId">Subject Code</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setSubjectCode(e.target.value)}
                      value={subjectCode}
                    />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="yearId">Year</label>
                    <select
                      onChange={(e) => setYear(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.year,
                      })}
                      id="yearId"
                    >
                      <option>Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>

                    {error.year && (
                      <div classNameName="invalid-feedback">{error.year}</div>
                    )}
                  </div>

                  <div className="form-group my-2">
                    <label htmlFor="sectionId">Section</label>
                    <select
                      onChange={(e) => setSection(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.section,
                      })}
                      id="sectionId"
                    >
                      <option>Select</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </select>
                    {error.section && (
                      <div classNameName="invalid-feedback">
                        {error.section}
                      </div>
                    )}
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-md-1">
                      {isLoading && (
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only"></span>
                        </div>
                      )}
                    </div>
                  </div>
                  {!isLoading && (
                    <button
                      type="submit"
                      className="btn btn-secondary btn-block my-2 hide-print"
                    >
                      Search
                    </button>
                  )}
                </form>
                <div>
                  {studentdetails ? (
                    <div>
                      <div className="col-lg-12 col-md-12 shadow my-3">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td className="table-horizontal-heading">
                                <b>Department</b>
                              </td>
                              <td>{facultyUser.faculty.faculty.department}</td>
                            </tr>
                            <tr>
                              <td className="table-horizontal-heading">
                                <b>Subject Name</b>
                              </td>

                              <td>
                                {
                                  facultyUser.studentAttendanceDetails[0]
                                    .subject.subjectName
                                }
                              </td>
                            </tr>
                            <tr>
                              <td className="table-horizontal-heading">
                                <b>Subject Code</b>
                              </td>
                              <td>
                                {
                                  facultyUser.studentAttendanceDetails[0]
                                    .subject.subjectCode
                                }
                              </td>
                            </tr>
                            <tr>
                              <td className="table-horizontal-heading">
                                <b>Year</b>
                              </td>
                              <td>
                                {
                                  facultyUser.studentAttendanceDetails[0]
                                    .subject.year
                                }
                              </td>
                            </tr>
                            <tr>
                              <td className="table-horizontal-heading">
                                <b>Total Lectures </b>
                              </td>
                              <td>
                                {
                                  facultyUser.studentAttendanceDetails[0]
                                    .totalLecturesByFaculty
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-lg-12 col-md-12 shadow my-5 printableData">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Sno</th>
                              <th scope="col">Student Name</th>
                              <th scope="col">Registration Number</th>
                              <th scope="col">Lectures Attended</th>
                              <th scope="col">Attendence Percentage(%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {facultyUser.studentAttendanceDetails.map(
                              (item, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.student.name}</td>
                                    <td> {item.student.registrationNumber} </td>
                                    <td className="text-center">
                                      {item.lectureAttended}{" "}
                                    </td>
                                    <td className="text-center">
                                      {(
                                        (item.lectureAttended /
                                          item.totalLecturesByFaculty) *
                                        100
                                      ).toFixed(2)}{" "}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="hide-print">
                        <button
                          className="btn btn-secondary btn-block my-2 hide-print"
                          onClick={(e) => window.print()}
                        >
                          Print
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
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

export default FacultyGetAttendance;
