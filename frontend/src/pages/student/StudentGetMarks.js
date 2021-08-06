import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StudentSideNavbar from "../../components/StudentSideNavbar";
import StudentHomeHelper from "../../components/StudentHomeHelper";
import classnames from "classnames";

import { studentFetchMarks } from "../../redux/actions/studentActions";

function StudentGetMarks(props) {
  const studentUser = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const [exam, setExam] = useState("");
  const [error, setError] = useState({});

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(studentFetchMarks({ exam }));
    console.log(studentUser.allMarks);
  };
  useEffect(() => {
    console.log(studentUser);
  }, [studentUser.allMarks]);
  return (
    <div>
      {studentUser.isAuthenticated ? (
        <>
          <div className="container-fluid">
            <div className="hide-print header">
              <StudentHomeHelper />
            </div>
            <div style={{ height: "11vh" }}></div>
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-5 position-fixed sidebar">
                <StudentSideNavbar />
              </div>
              <div className="col-lg-4 col-md-1 col-sm-1"></div>
              <div className="col-lg-6 col-md-4 my-4">
                <form noValidate onSubmit={formHandler}>
                  <div className="form-group my-2">
                    <label htmlFor="Exam">Exam</label>
                    <select
                      onChange={(e) => setExam(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.year,
                      })}
                      id="yearId"
                    >
                      <option>Select</option>
                      <option value="Minor1">Minor 1</option>
                      <option value="Minor2">Minor 2</option>
                      <option value="Annual">Annual Exam</option>
                    </select>

                    {error.year && (
                      <div classNameName="invalid-feedback">{error.year}</div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-secondary">
                    Get Marks
                  </button>
                </form>
                <div className="my-3">
                  {studentUser.allMarks.length > 0 ? (
                    <>
                      <h4 className="my-2">{exam}</h4>
                      <table className="table border shadow my-2">
                        <thead>
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Subject Code</th>
                            <th scope="col">Subject Name</th>
                            <th scope="col">Marks</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentUser.allMarks.map((res, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{res.subjectCode}</td>
                              <td>{res.subjectName}</td>
                              <td>{res.marks}</td>
                              <td>{res.totalMarks}</td>
                              <td>
                                {((res.marks / res.totalMarks) * 100).toFixed(
                                  2
                                )}
                                %
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <></>
                  )}
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

export default StudentGetMarks;
