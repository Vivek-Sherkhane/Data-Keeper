import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHomehelper from "../../components/AdminHomehelper";
import AdminSideNavbar from "../../components/AdminSideNavbar";

function AdminHomePage(props) {
  const adminUser = useSelector((state) => state.admin);
  useEffect(() => {
    if (!adminUser) {
      props.history.push("/");
    }
  }, [adminUser]);
  // const currentAdmin = localStorage.getItem('currentAdmin') ? JSON.parse(localStorage.getItem('currentAdmin')) : null
  //console.log(currentAdmin);

  return (
    <div>
      {adminUser.isAuthenticated ? (
        <>
          <div className="hide-print header">
            <AdminHomehelper />
          </div>
          <div style={{ height: "9.85vh" }}></div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3 position-fixed sidebar">
                <AdminSideNavbar />
              </div>
              <div className="col-lg-4"></div>
              <div className="col-6 my-5 ">
                {/* <div className="row"> */}
                <div className="col-md-7 shadow">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <b>Name </b>
                        </td>
                        <td>{adminUser.admin.name}</td>
                      </tr>
                      <tr>
                        <b>
                          <td>Email</td>
                        </b>
                        <td>{adminUser.admin.email}</td>
                      </tr>
                      <tr>
                        <b>
                          <td>Registration Number</td>
                        </b>
                        <td>{adminUser.admin.registrationNumber}</td>
                      </tr>
                      <tr>
                        <b>
                          <td>Joining Year</td>
                        </b>
                        <td>{adminUser.admin.joiningYear}</td>
                      </tr>
                      <tr>
                        <b>
                          <td>Department</td>
                        </b>
                        <td>{adminUser.admin.department}</td>
                      </tr>
                      <tr>
                        <b>
                          <td>Contact Number</td>
                        </b>
                        <td>
                          {adminUser.admin.contactNumber
                            ? adminUser.admin.contactNumber
                            : "NA"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* </div> */}
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </>
      ) : (
        props.history.push("/")
      )}
    </div>
  );
}

export default AdminHomePage;
