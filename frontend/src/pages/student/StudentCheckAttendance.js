import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StudentSideNavbar from "../../components/StudentSideNavbar";
import StudentHomeHelper from "../../components/StudentHomeHelper";
import { useHistory } from "react-router-dom";
import { studentGetAttendence } from "../../redux/actions/studentActions";

const StudentCheckAttendance = (props) => {
  const studentUser = useSelector((state) => state.student);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(studentGetAttendence());
  }, []);

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
              <div className="col-lg-6 col-md-5 mt-5">
                <table className="table border shadow">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Subject Code</th>
                      <th scope="col">Subject Name</th>
                      <th scope="col">No.of lectures attended</th>
                      <th scope="col">No.of lectures absent</th>
                      <th scope="col">Total lectures</th>
                      <th scope="col">Attendence percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentUser.attendence.map((res, index) => (
                      <tr key={index} className="attendence-table-row">
                        <th scope="row">{index + 1}</th>
                        <td>{res.subjectCode}</td>
                        <td>{res.subjectName}</td>
                        <td>{res.lectureAttended}</td>
                        <td>{res.absentHours}</td>
                        <td>{res.totalLecturesByFaculty}</td>
                        <td>{res.attendence}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        props.history.push("/")
      )}
    </div>
  );
};

export default StudentCheckAttendance;
