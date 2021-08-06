import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import AdminHomehelper from "../../../components/AdminHomehelper";
import AdminSideNavbar from "../../../components/AdminSideNavbar";
import {
  AdminDeleteRoom,
  AdminUpdateRoom,
} from "../../../redux/actions/adminActions";

function AdminEditRoom(props) {
  const admin = useSelector((state) => state.admin);
  const storeError = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const [hostel, setHostel] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [studentRegNumber, setStudentRegNumber] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (e.target.value == "delete") {
      await dispatch(AdminDeleteRoom({ hostel, roomNo })).then(() => {
        setIsLoading(false);
      });
    } else if (e.target.value == "update") {
      await dispatch(
        AdminUpdateRoom({ hostel, roomNo, studentRegNumber })
      ).then(() => {
        setIsLoading(false);
      });
    }
    setHostel("");
    setRoomNo("");
    setStudentRegNumber("");
  };

  // useEffect(() => {
  //   if (admin.deleteRoom) setIsLoading(false);
  // }, [admin.deleteRoom]);

  useEffect(() => {
    if (storeError) {
      setError(storeError);
      setIsLoading(false);
    }
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
                <form noValidate>
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
                    {/* {error.hostel && (
                      <div className="invalid-feedback">{error.hostel}</div>
                    )} */}
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="roomNo">Room Number</label>
                    <input
                      onChange={(e) => setRoomNo(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.roomNumber,
                      })}
                      id="roomNo"
                      type="Number"
                      value={roomNo}
                    ></input>
                    {error.room && (
                      <div className="invalid-feedback">{error.room}</div>
                    )}
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="regNo">Student Registration Number</label>
                    <input
                      onChange={(e) => setStudentRegNumber(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.regNo,
                      })}
                      id="regNo"
                      type="text"
                      value={studentRegNumber}
                    ></input>
                    {error.regNo && (
                      <div className="invalid-feedback">{error.regNo}</div>
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
                    <div>
                      <button
                        type="submit"
                        name="action"
                        className="btn btn-secondary btn-block my-2 "
                        value="update"
                        style={{ marginRight: "10px" }}
                        onClick={formHandler}
                      >
                        Update
                      </button>
                      <button
                        type="submit"
                        name="action"
                        value="delete"
                        className="btn btn-secondary btn-block my-2 "
                        onClick={formHandler}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </form>
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

export default AdminEditRoom;
