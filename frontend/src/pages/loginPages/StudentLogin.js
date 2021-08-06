import React, { useEffect, useState } from "react";
import MainNavbar from "../../utilities/MainNavbar";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { studentLogin } from "../../redux/actions/studentActions";

function StudentLogin(props) {
  const [studentRegistrationNumber, setRegistrationNumber] = useState("");
  const [studentPassword, setPassword] = useState("");
  const [error, setError] = useState("");

  const student = useSelector((state) => state.student);
  const storeError = useSelector((state) => state.error);

  useEffect(() => {
    if (student.isAuthenticated) {
      props.history.push("/studenthome");
    }
  }, [student.isAuthenticated]);

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
      studentLogin({
        registrationNumber: studentRegistrationNumber,
        password: studentPassword,
      })
    );
  };

  return (
    <div className="container-fluid form-container">
      <MainNavbar />
      <div className="form-box">
        <form onSubmit={formhandler} className="form">
          <div>
            <h2 className="display-5 text-center">STUDENT</h2>
          </div>
          {/* {loading && <LoadingBox/>}
                {error && <MessageBox variant="danger">{error}</MessageBox>} */}
          <div className="form-group">
            <label htmlFor="email">Registration Number</label>
            <input
              onChange={(e) => setRegistrationNumber(e.target.value)}
              type="text"
              value={studentRegistrationNumber}
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
              value={studentPassword}
              className={classnames("form-control form-control-lg", {
                "is-invalid": error.password,
              })}
              value={studentPassword}
              type="password"
              id="passwordId"
            />
            {error.password && (
              <div className="invalid-feedback">{error.password}</div>
            )}
          </div>
          <div>
            <button type="submit" className="primary btn-secondary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
