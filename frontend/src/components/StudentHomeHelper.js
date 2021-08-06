import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { studentLogout } from "../redux/actions/studentActions";

const StudentHomeHelper = (props) => {
  const studentUser = useSelector((state) => state.student);
  const currentStudent = localStorage.getItem("currentStudent")
    ? JSON.parse(localStorage.getItem("currentStudent"))
    : null;

  const history = useHistory();

  const [name, setName] = useState("");
  useEffect(() => {
    if (currentStudent) {
      setName(currentStudent.student.name);
    }
  }, [currentStudent]);

  useEffect(() => {
    if (!studentUser) {
      history.push("/");
    }
  }, [studentUser]);
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(studentLogout());
  };
  return (
    <div>
      {studentUser.isAuthenticated ? (
        <>
          <div className="homeHelperContainer">
            <h4 className="navbar-brand mt-1">DATA KEEPER</h4>
            <div>
              <button
                style={{ listStyle: "None", marginRight: "1vw" }}
                onClick={logoutHandler}
                type="button"
                className="btn btn-dark"
              >
                <li>LOGOUT</li>
              </button>
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default StudentHomeHelper;
