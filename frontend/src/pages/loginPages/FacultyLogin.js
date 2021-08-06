import React, { useEffect, useState } from "react";
import MainNavbar from "../../utilities/MainNavbar";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { facultyLogin } from "../../redux/actions/facultyactions";

function FacultyLogin(props) {
  const [facultyRegistrationNumber, setRegistrationNumber] = useState("");
  const [facultyPassword, setPassword] = useState("");
  const [error, setError] = useState("");

  const faculty = useSelector((state) => state.faculty);
  const storeError = useSelector((state) => state.error);

  useEffect(() => {
    if (faculty.isAuthenticated) {
      props.history.push("/facultyhome");
    }
  }, [faculty.isAuthenticated]);

  useEffect(() => {
    if (storeError) {
      setError(storeError);
    }
  }, [storeError]);

  const dispatch = useDispatch();

  const formhandler = (e) => {
    e.preventDefault();
    let registrationNumber;
    let password;
    //setIsFacultyLoading(true)
    dispatch(
      facultyLogin({
        registrationNumber: facultyRegistrationNumber,
        password: facultyPassword,
      })
    );
  };

  return (
    <div className="container-fluid form-container">
      <MainNavbar />
      <div className="form-box">
        <form onSubmit={formhandler} className="form">
          <div>
            <h2 className="display-5 text-center">FACULTY</h2>
          </div>
          {/* {loading && <LoadingBox/>}
                {error && <MessageBox variant="danger">{error}</MessageBox>} */}
          <div className="form-group">
            <label htmlFor="email">Registration Number</label>
            <input
              onChange={(e) => setRegistrationNumber(e.target.value)}
              type="text"
              value={facultyRegistrationNumber}
              className={classnames("form-control form-control-lg", {
                "is-invalid": error.registrationNumber,
              })}
              id="emailId"
            />
            {error.registrationNumber && (
              <div className="invalid-feedback">{error.registrationNumber}</div>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={facultyPassword}
              className={classnames("form-control form-control-lg", {
                "is-invalid": error.password,
              })}
              value={facultyPassword}
              type="password"
              id="passwordId"
            />
            {error.password && (
              <div className="invalid-feedback">{error.password}</div>
            )}
          </div>
          <div>
            <button type="submit" className="primary  btn-secondary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FacultyLogin;
