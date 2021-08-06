import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AdminLogout } from "../redux/actions/adminActions";
// import { adminLogout } from '../redux/action/adminAction';

const AdminHomehelper = (props) => {
  const adminUser = useSelector((state) => state.admin);
  const currentAdmin = localStorage.getItem("currentAdmin")
    ? JSON.parse(localStorage.getItem("currentAdmin"))
    : null;
  const history = useHistory();

  const [name, setName] = useState("");
  useEffect(() => {
    if (currentAdmin) {
      setName(currentAdmin.name);
    }
  }, [currentAdmin]);

  useEffect(() => {
    if (!adminUser) {
      history.push("/");
    }
  }, [adminUser]);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(AdminLogout());
  };
  return (
    <div>
      {adminUser.isAuthenticated ? (
        <>
          <div className="homeHelperContainer">
            <h4 className="brand">DATA KEEPER</h4>
            <button
              style={{ listStyle: "None", marginRight: "1vw" }}
              onClick={logoutHandler}
              type="button"
              className="btn btn-dark"
            >
              <li>LOGOUT</li>
            </button>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default AdminHomehelper;
