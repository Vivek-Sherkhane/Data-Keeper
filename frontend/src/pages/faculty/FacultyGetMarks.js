import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import FacultySideNavbar from "../../components/FacultySideNavbar";
import FacultyHomeHelper from "../../components/FacultyHomeHelper";
import { FacultyStudentsMarks } from "../../redux/actions/facultyactions";

function FacultyGetMarks(props) {
  const facultyUser = useSelector((state) => state.faculty);
  const storeError = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const [subjectCode, setSubjectCode] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [exam, setExam] = useState("");
  const [error, setError] = useState({});
  const [studentdetails, setStudentDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorHelper, setErrorHelper] = useState({});
  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStudentDetails(false);
    await dispatch(
      FacultyStudentsMarks({
        year,
        section,
        subjectCode,
        exam,
        department: facultyUser.faculty.faculty.department,
      })
    ).then(() => {
      setIsLoading(false);
    });
  };
  useEffect(() => {
    setStudentDetails(false);
  }, []);

  useEffect(() => {
    if (facultyUser.studentsMarksDetails.length > 0) {
      setStudentDetails(true);
    }
  }, [facultyUser.studentsMarksDetails]);

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
                    <label htmlFor="examId">Exam</label>
                    <select
                      onChange={(e) => setExam(e.target.value)}
                      value={exam}
                      className={classnames("form-control", {
                        "is-invalid": errorHelper.exam,
                      })}
                      id="examId"
                    >
                      <option>Select</option>
                      <option value="Minor1">Minor 1</option>
                      <option value="Minor2">Minor 2</option>
                      <option value="Annual">Annual</option>
                    </select>
                    {errorHelper.exam && (
                      <div classNameName="invalid-feedback">
                        {errorHelper.exam}
                      </div>
                    )}
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
                      className="btn btn-secondary btn-block my-2 "
                    >
                      Search
                    </button>
                  )}
                </form>
                <div>
                  {studentdetails ? (
                    <div>
                      <div id="printableData">
                        <div className="col-lg-12 col-md-12 shadow my-3 printableData">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td className="table-horizontal-heading">
                                  <b>Department</b>
                                </td>
                                <td>
                                  {facultyUser.faculty.faculty.department}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-horizontal-heading">
                                  <b>Subject Name</b>
                                </td>

                                <td>
                                  {
                                    facultyUser.studentsMarksDetails[0].subject
                                      .subjectName
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className="table-horizontal-heading">
                                  <b>Subject Code</b>
                                </td>
                                <td>
                                  {
                                    facultyUser.studentsMarksDetails[0].subject
                                      .subjectCode
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className="table-horizontal-heading">
                                  <b>Year</b>
                                </td>
                                <td>
                                  {
                                    facultyUser.studentsMarksDetails[0].subject
                                      .year
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className="table-horizontal-heading">
                                  <b>Section</b>
                                </td>
                                <td>
                                  {
                                    facultyUser.studentsMarksDetails[0].student
                                      .section
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td className="table-horizontal-heading">
                                  <b>Exam </b>
                                </td>
                                <td>
                                  {facultyUser.studentsMarksDetails[0].exam}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-horizontal-heading">
                                  <b>Total Marks </b>
                                </td>
                                <td>
                                  {
                                    facultyUser.studentsMarksDetails[0]
                                      .totalMarks
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
                                <th scope="col">Marks Obtained</th>
                                <th scope="col">Percentage(%)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {facultyUser.studentsMarksDetails.map(
                                (item, index) => {
                                  return (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{item.student.name}</td>
                                      <td>
                                        {" "}
                                        {item.student.registrationNumber}{" "}
                                      </td>
                                      <td className="text-center">
                                        {item.marks}{" "}
                                      </td>
                                      <td className="text-center">
                                        {(
                                          (item.marks / item.totalMarks) *
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
                      </div>
                      <div className="hide-print">
                        <button
                          className="btn btn-secondary btn-block my-2"
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

export default FacultyGetMarks;
