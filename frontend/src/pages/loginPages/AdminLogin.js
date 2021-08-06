import React, { useEffect } from "react";
import { useState } from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../components/MessageBox";
import { adminLogin } from "../../redux/actions/adminActions";
import MainNavbar from "../../utilities/MainNavbar";

function AdminLogin(props) {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const admin = useSelector((state) => state.admin);
  const storeError = useSelector((state) => state.error);

  useEffect(() => {
    if (storeError) {
      setError(storeError);
    }
  }, [storeError]);

  useEffect(() => {
    if (admin.isAuthenticated) {
      props.history.push("/adminhome");
    }
  }, [admin.isAuthenticated]);

  const dispatch = useDispatch();

  const formhandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin({ registrationNumber, password }));
  };
  return (
    <div className="container-fluid form-container">
      <MainNavbar />
      {/* {error ? <MessageBox variant="danger">{error}</MessageBox> : ( */}

      <div className="form-box" style={{ backgroundColor: "#fff" }}>
        <form noValidate onSubmit={formhandler} className="form">
          <h2 className="display-5 text-center">ADMIN</h2>
          <div className="form-group">
            <label htmlFor="emailId">Registration Number</label>
            <input
              onChange={(e) => setRegistrationNumber(e.target.value)}
              type="text"
              value={registrationNumber}
              className={classnames("form-control form-control-lg", {
                "is-invalid": error.registrationNumber,
              })}
              id="emailId"
            />
            {error.registrationNumber && (
              <div className="invalid-feedback">{error.registrationNumber}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="passwordId">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={classnames("form-control form-control-lg", {
                "is-invalid": error.password,
              })}
              value={password}
              type="password"
              id="passwordId"
            />
            {error.password && (
              <div className="invalid-feedback">{error.password}</div>
            )}
          </div>
          <div>
            <button type="submit" className="primary  btn-secondary my-2">
              Login
            </button>
          </div>
        </form>
      </div>

      {/* )} */}
    </div>
  );
}

export default AdminLogin;
