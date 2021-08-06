import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import AdminHomehelper from "../../../components/AdminHomehelper";
import AdminSideNavbar from "../../../components/AdminSideNavbar";
import { AddRoom, AdminNewRoom } from "../../../redux/actions/adminActions";
import schema from "../../../utilities/AddRoomSchema";
import readXlsxFile from "read-excel-file";
import InstructionBox from "../../../components/MessageBoxes/InstructionBox";

function AdminAddRoom(props) {
  const admin = useSelector((state) => state.admin);
  const storeError = useSelector((state) => state.error);

  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [hostelName, setHostelName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [studentRegNumber, setStudentRegNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [department, setDepartment] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherContactNumber, setFatherContactNumber] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const list = ["Room Number", "Occupancy Type", "Student Registration Number"];

  const formHandler = async (e) => {
    e.preventDefault();

    let data = null;
    data = await readXlsxFile(file, { schema });
    console.log(data);
    let temp = null;
    temp = data.rows;
    if (temp.length > 0) {
      setRoomData(temp);
      console.log(roomData);
    }
    if (roomData.length > 0) {
      await dispatch(
        AdminNewRoom({
          roomData,
          hostelName,
        })
      ).then(() => {
        setIsLoading(false);
      });
      setRoomData([]);
      setHostelName("");
      setFile(null);
      temp = null;
    } else {
      alert("click on submit button once again");
      setIsLoading(false);
    }

    // dispatch(AdminNewRoom({ hostelName, roomNo, studentRegNumber, occupancy }));
    // setContactNumber("");
    // setDepartment("");
    // setFatherContactNumber("");
    // setFatherName("");
    // setHostelName("");
    // setOccupancy("");
    // setStudentName("");
    // setStudentRegNumber("");
    // setRoomNo("");
  };

  useEffect(() => {
    if (storeError) {
      setError(storeError);
    } else {
      setError({});
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
              <div className="col-lg-8 mt-5">
                <div className="col-lg-8 mb-4">
                  <InstructionBox list={list} />
                </div>
                <form noValidate onSubmit={formHandler}>
                  <div className="col-lg-8">
                    <div className="form-group my-3">
                      <label htmlFor="hostelName">Hostel Name</label>
                      <select
                        onChange={(e) => setHostelName(e.target.value)}
                        className={classnames("form-control", {
                          "is-invalid": error.hostelName,
                        })}
                        id="hostelName"
                        value={hostelName}
                      >
                        <option>Select</option>
                        <option value="BH1">BH1</option>
                        <option value="BH2">BH2</option>
                        <option value="BH3">BH3</option>
                        <option value="GH">GH</option>
                      </select>
                      {error.hostelName && (
                        <div className="invalid-feedback">
                          {error.hostelName}
                        </div>
                      )}
                    </div>
                    <div className="form-group my-2">
                      <input
                        className="form-control"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      ></input>
                    </div>
                  </div>
                  {/* <div className="form-group  my-3">
                      <label htmlFor="roomNo">Room No</label>
                      <input
                        onChange={(e) => setRoomNo(e.target.value)}
                        type="Number"
                        className={classnames("form-control", {
                          "is-invalid": error.roomNo,
                        })}
                        id="roomNo"
                        value={roomNo}
                      />
                      {error.roomNo && (
                        <div className="invalid-feedback">{error.roomNo}</div>
                      )}
                    </div>
                    <div className="form-group  my-3">
                      <label htmlFor="occupancy">Occupancy</label>
                      <select
                        onChange={(e) => setOccupancy(e.target.value)}
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": error.occupancy,
                        })}
                        id="occupancy"
                        value={occupancy}
                      >
                        <option>Select</option>
                        <option value="single">single</option>
                      </select>
                      {error.roomNo && (
                        <div className="invalid-feedback">
                          {error.occupancy}
                        </div>
                      )}
                    </div>
                    <div className="form-group  my-3">
                      <label htmlFor="studentRegNo">
                        Student Registration Number
                      </label>
                      <input
                        onChange={(e) => setStudentRegNumber(e.target.value)}
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": error.regNumber,
                        })}
                        id="studentRegNo"
                        value={studentRegNumber}
                      />
                      {error.studentRegNo && (
                        <div className="invalid-feedback">
                          {error.studentRegNo}
                        </div>
                      )}
                    </div>
                    <div className="form-group  my-3">
                      <label htmlFor="studentName">Student Name</label>
                      <input
                        onChange={(e) => setStudentName(e.target.value)}
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": error.name,
                        })}
                        id="studentName"
                        value={studentName}
                      />
                      {error.name && (
                        <div className="invalid-feedback">{error.name}</div>
                      )}
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="departmentId">Department</label>
                      <select
                        onChange={(e) => setDepartment(e.target.value)}
                        className={classnames("form-control", {
                          "is-invalid": error.department,
                        })}
                        id="departmentId"
                        value={department}
                      >
                        <option>Select</option>
                        <option value="E.C.E">E.C.E</option>
                        <option value="E.E.E">E.E.E</option>
                        <option value="C.S.E">C.S.E</option>
                        <option value="I.T">I.T</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                      </select>
                      {error.department && (
                        <div className="invalid-feedback">
                          {error.department}
                        </div>
                      )}
                    </div>
                    <div className="form-group  my-3">
                      <label htmlFor="contactNo">Student Contact Number</label>
                      <input
                        onChange={(e) => setContactNumber(e.target.value)}
                        type="Number"
                        className={classnames("form-control", {
                          "is-invalid": error.contact,
                        })}
                        id="contactNo"
                        value={contactNumber}
                      />
                      {error.contact && (
                        <div className="invalid-feedback">{error.contact}</div>
                      )}
                    </div>
                    <div className="form-group  my-3">
                      <label htmlFor="fatherName">Father Name</label>
                      <input
                        onChange={(e) => setFatherName(e.target.value)}
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": error.fathername,
                        })}
                        id="fatherName"
                        value={fatherName}
                      />
                      {error.fathername && (
                        <div className="invalid-feedback">
                          {error.fathername}
                        </div>
                      )}
                    </div>
                    <div className="form-group  my-3">
                      <label htmlFor="fatherContactNo">
                        Father Contact Number
                      </label>
                      <input
                        onChange={(e) => setFatherContactNumber(e.target.value)}
                        type="Number"
                        className={classnames("form-control", {
                          "is-invalid": error.fatherContact,
                        })}
                        id="fatherContactNo"
                        value={fatherContactNumber}
                      />
                      {error.fatherContact && (
                        <div className="invalid-feedback">
                          {error.fatherContact}
                        </div>
                      )}
                    </div> */}
                  {/* <div class="row justify-content-center">
                      <div class="col-md-1">
                        {isLoading && (
                          <div
                            class="spinner-border text-primary"
                            role="status"
                          >
                            <span class="sr-only"></span>
                          </div>
                        )}
                      </div>
                    </div> */}

                  <button type="submit" className="btn btn-secondary  ">
                    Add Room
                  </button>
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

export default AdminAddRoom;
