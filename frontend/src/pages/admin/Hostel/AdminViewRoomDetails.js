import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import AdminHomehelper from "../../../components/AdminHomehelper";
import AdminSideNavbar from "../../../components/AdminSideNavbar";
import { AdminViewRoom } from "../../../redux/actions/adminActions";
import isEmpty from "../../../validation/isEmpty";
function AdminViewRoomDetails(props) {
  const admin = useSelector((state) => state.admin);
  const storeError = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const [hostel, setHostel] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [error, setError] = useState({});
  const [roomdetails, setRoomDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(AdminViewRoom({ hostel, roomNo }));
    setHostel("");
    setRoomNo("");
  };

  useEffect(() => {
    if (!isEmpty(admin.roomDetails)) {
      setIsLoading(false);
      setRoomDetails(true);
    }
  }, [admin.roomDetails]);

  useEffect(() => {
    if (storeError) setIsLoading(false);
  }, [storeError]);

  return (
    <div>
      {admin.isAuthenticated ? (
        <>
          <div className="hide-print header">
            <AdminHomehelper />
          </div>
          <div style={{ height: "9.85vh" }}></div>
          <div className="container-fluid">
            <div className="row ">
              <div className="col-lg-3 col-md-3 col-sm-3 position-fixed sidebar">
                <AdminSideNavbar />
              </div>
              <div className="col-lg-4 col-md-2"></div>
              <div className="col-lg-6 mt-5">
                <form noValidate onSubmit={formHandler}>
                  <div className="form-group my-2">
                    <label htmlFor="hostelName">Hostel</label>
                    <select
                      onChange={(e) => setHostel(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.hostel,
                      })}
                      id="hostelName"
                      value={hostel}
                    >
                      <option>Select</option>
                      <option value="BH1">BH 1</option>
                      <option value="BH2">BH 2</option>
                      <option value="BH3">BH 3</option>
                      <option value="GH">GH</option>
                    </select>
                    {error.hostel && (
                      <div className="invalid-feedback">{error.hostel}</div>
                    )}
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="roomNo">Room Number</label>
                    <input
                      onChange={(e) => setRoomNo(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.room,
                      })}
                      id="roomNo"
                      type="Number"
                      value={roomNo}
                    ></input>
                    {error.hostel && (
                      <div className="invalid-feedback">{error.hostel}</div>
                    )}
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-md-1">
                      {isLoading && (
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only"></span>
                        </div>
                      )}
                    </div>
                  </div>
                  {!isLoading && (
                    <button
                      type="submit"
                      className="btn btn-secondary btn-block my-2 "
                    >
                      Search
                    </button>
                  )}
                </form>
                <div>
                  {roomdetails ? (
                    <div className="col-lg-12 col-md-7 shadow my-3">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td className="table-horizontal-heading">
                              <b>Hostel</b>
                            </td>
                            <td>{admin.roomDetails.hostelName}</td>
                          </tr>
                          <tr>
                            <b>
                              <td className="table-horizontal-heading">
                                Room Number
                              </td>
                            </b>
                            <td>{admin.roomDetails.roomNo}</td>
                          </tr>
                          <tr>
                            <b>
                              <td className="table-horizontal-heading">
                                Room Occupancy type{" "}
                              </td>
                            </b>
                            <td>{admin.roomDetails.occupancy}</td>
                          </tr>
                          <tr>
                            <b>
                              <td className="table-horizontal-heading">
                                Student Name
                              </td>
                            </b>
                            <td>{admin.roomDetails.student.name}</td>
                          </tr>
                          <tr>
                            <b>
                              <td className="table-horizontal-heading">
                                Student Registration number
                              </td>
                            </b>
                            <td>
                              {admin.roomDetails.student.registrationNumber}
                            </td>
                          </tr>
                          <tr>
                            <b>
                              <td className="table-horizontal-heading">
                                Department
                              </td>
                            </b>
                            <td>{admin.roomDetails.student.department}</td>
                          </tr>
                          <tr>
                            <b>
                              <td className="table-horizontal-heading">
                                Contact Number
                              </td>
                            </b>
                            <td>
                              {admin.roomDetails.student.studentMobileNumber}
                            </td>
                          </tr>

                          <tr>
                            <b>
                              <td className="table-horizontal-heading">
                                FatherName
                              </td>
                            </b>
                            {admin.roomDetails.student.fatherName ? (
                              <td>{admin.roomDetails.student.fatherName}</td>
                            ) : (
                              "NA"
                            )}
                          </tr>
                          <tr>
                            <b>
                              <td className="table-horizontal-heading">
                                Father Contact Number
                              </td>
                            </b>
                            {admin.roomDetails.student.fatherMobileNumber ? (
                              <td>
                                {admin.roomDetails.student.fatherMobileNumber}
                              </td>
                            ) : (
                              "NA"
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : null}
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

export default AdminViewRoomDetails;
