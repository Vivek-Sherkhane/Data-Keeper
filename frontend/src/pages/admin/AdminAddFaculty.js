import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { adminAddFaculty } from "../../redux/actions/adminActions";
import schema from "../../utilities/AddFacultySchema";
import AdminHomehelper from "../../components/AdminHomehelper";
import AdminSideNavbar from "../../components/AdminSideNavbar";
import readXlsxFile from "read-excel-file";
import InstructionBox from "../../components/MessageBoxes/InstructionBox";

const AdminAddFaculty = () => {
  const admin = useSelector((state) => state.admin);
  const storeError = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [facultyMobileNUmber, setFacultyMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [error, setError] = useState({});
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [facultyData, setFacultyData] = useState([]);
  const list = [
    "Name",
    "Email",
    "Aadhar Card",
    "Date of Birth",
    "Gender",
    "Faculty Contact Number",
    "Designation",
  ];
  useEffect(() => {
    if (storeError) {
      setError(storeError);
    }
  }, [storeError]);
  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let data = null;
    data = await readXlsxFile(file, { schema });
    let temp = null;
    temp = data.rows;
    if (temp.length > 0) {
      setFacultyData(temp);
    }
    if (facultyData.length > 0) {
      await dispatch(
        adminAddFaculty({
          facultyData,
          department,
        })
      ).then(() => {
        setIsLoading(false);
      });
      setFacultyData([]);
      setDepartment("");
      setFile(null);
      temp = null;
    } else {
      alert("click on submit button once again");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (admin.adminAddFaculty) {
      setDepartment("");
      setFile(null);
    }
  }, [admin.adminAddFaculty]);

  useEffect(() => {
    if (storeError || admin.adminAddFaculty) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [storeError, admin.adminAddFaculty]);
  return (
    <div>
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
            <div className="col-lg-8 mt-4">
              <div className="col-lg-8 mb-4">
                <InstructionBox list={list} />
              </div>

              <form noValidate onSubmit={formHandler}>
                {/* <div className="row"> */}
                <div className="col-lg-8 col-md-6">
                  {/* <div className="form-group my-3">
                    <label htmlFor="nameId">Faculty Name</label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": error.name,
                      })}
                      id="nameId"
                    />
                    {error.name && (
                      <div className="invalid-feedback">{error.name}</div>
                    )}
                  </div> */}
                  {/* <div className="form-group my-3">
                    <label htmlFor="emailId">Email</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className={classnames("form-control", {
                        "is-invalid": error.email,
                      })}
                      id="emailId"
                    />
                    {error.email && (
                      <div className="invalid-feedback">{error.email}</div>
                    )}
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="designationId">Designation</label>
                    <select
                      onChange={(e) => setDesignation(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.designation,
                      })}
                      id="designationId"
                    >
                      <option>Select</option>
                      <option value="Assistant Professor">
                        Assistant Professor
                      </option>
                      <option value="Senior Professer">Senior Professer</option>
                    </select>
                    {error.designation && (
                      <div className="invalid-feedback">
                        {error.designation}
                      </div>
                    )} */}
                  {/* </div> */}
                  <div className="form-group my-3">
                    <label htmlFor="departmentId">Department</label>
                    <select
                      onChange={(e) => setDepartment(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.department,
                      })}
                      id="departmentId"
                    >
                      <option>Select</option>
                      <option value="E.C.E">E.C.E</option>
                      <option value="C.S.E">C.S.E</option>
                      <option value="E.E.E">E.E.E</option>
                      <option value="I.T">I.T</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                    </select>
                    {error.department && (
                      <div className="invalid-feedback">{error.department}</div>
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
                {/* <div className="col-md-6">
                  <div className="form-group my-3">
                    <label htmlFor="dobId">DOB</label>
                    <input
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      className={classnames("form-control", {
                        "is-invalid": error.dob,
                      })}
                      id="dobId"
                    />
                    {error.dob && (
                      <div className="invalid-feedback">{error.dob}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="genderId">Gender</label>
                    <select
                      onChange={(e) => setGender(e.target.value)}
                      className="form-control"
                      id="genderId"
                    >
                      <option>Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="numberId">Contact Number</label>
                    <input
                      onChange={(e) => setFacultyMobileNumber(e.target.value)}
                      type="number"
                      className="form-control"
                      id="numberId"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="aadharId">Aadhar Card Number</label>
                    <input
                      onChange={(e) => setAadharCard(e.target.value)}
                      type="number"
                      className="form-control"
                      id="aadharId"
                    />
                  </div>
                </div> */}
                {/* </div> */}
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
                  <button type="submit" className="btn btn-secondary my-2">
                    Add Faculty
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AdminAddFaculty;
