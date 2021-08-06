import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { facultyLogout } from "../redux/actions/facultyactions";

const FacultyHomeHelper = (props) => {
  const facultyUser = useSelector((state) => state.faculty);
  const currentfaculty = localStorage.getItem("currentFaculty")
    ? JSON.parse(localStorage.getItem("currentFaculty"))
    : null;
  //console.log(currentfaculty);
  // const {isloading,admin,error} = adminUser;
  const history = useHistory();

  const [name, setName] = useState("");
  useEffect(() => {
    if (currentfaculty) {
      setName(currentfaculty.faculty.name);
    }
  }, [currentfaculty]);

  useEffect(() => {
    if (!facultyUser) {
      history.push("/");
    }
  }, [facultyUser]);
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(facultyLogout());
  };
  return (
    <div>
      {facultyUser.isAuthenticated ? (
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

export default FacultyHomeHelper;
