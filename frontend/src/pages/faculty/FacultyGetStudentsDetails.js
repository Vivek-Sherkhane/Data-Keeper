import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FacultySideNavbar from "../../components/FacultySideNavbar";
import FacultyHomeHelper from "../../components/FacultyHomeHelper";
import { Link } from "react-router-dom";

const FacultyGetStudentsDetails = (props) => {
  const faculty = useSelector((state) => state.faculty);
  const storeError = useSelector((state) => state.error);

  const [error, setError] = useState({});

  useEffect(() => {
    if (storeError) {
      setError(storeError);
    } else {
      setError({});
    }
  }, [storeError]);

  return (
    <div>
      {faculty.isAuthenticated ? (
        <>
          <div className="hide-print header">
            <FacultyHomeHelper />
          </div>
          <div style={{ height: "11vh" }}></div>
          <div className="container-fluid">
            <div className="row ">
              <div className="col-lg-3 col-md-3 col-sm-3 position-fixed sidebar">
                <FacultySideNavbar />
              </div>
              <div className="col-lg-4 col-md-2"></div>
              <div className="col-lg-6 mt-5">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div key="1" className="card">
                      <Link to="/faculty/getattendance">
                        <img
                          className="medium"
                          src="../../../../images/attendance.png"
                          alt="hostel"
                        />
                      </Link>

                      <div className="card-body">
                        <Link to="/faculty/getattendance" className="card-link">
                          <h4>GET ATTENDANCE</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div key="1" className="card">
                      <Link to="/faculty/getmarks">
                        <img
                          className="medium"
                          src="../../../../images/marks.png"
                          alt="hostel"
                        />
                      </Link>
                      <div className="card-body">
                        <Link to="/faculty/getmarks" className="card-link">
                          <h4>GET MARKS</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
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
};

export default FacultyGetStudentsDetails;
