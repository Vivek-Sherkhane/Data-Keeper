import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import AdminHomehelper from "../../components/AdminHomehelper";
import { adminAddAdmin } from "../../redux/actions/adminActions";
import AdminSideNavbar from "../../components/AdminSideNavbar";
import readXlsxFile from "read-excel-file";
import schema from "../../utilities/AddAdminSchema";
import InstructionBox from "../../components/MessageBoxes/InstructionBox";

const AdminAddAdmin = (props) => {
  const admin = useSelector((state) => state.admin);
  const storeError = useSelector((state) => state.error);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [adminData, setAdminData] = useState([]);
  const list = [
    "Name",
    "Email",
    "Aadhar Card",
    "Date of Birth",
    "Gender",
    "Admin Contact Number",
  ];
  useEffect(() => {
    if (storeError) {
      setError(storeError);
    } else {
      setError({});
    }
  }, [storeError]);
  const formhandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let data = null;
    data = await readXlsxFile(file, { schema });
    console.log(data);
    let temp = null;
    temp = data.rows;
    if (temp.length > 0) {
      setAdminData(temp);
      console.log(adminData);
    }
    if (adminData.length > 0) {
      await dispatch(
        adminAddAdmin({
          adminData,
          department,
        })
      ).then(() => {
        setIsLoading(false);
      });
      setAdminData([]);
      setDepartment("");
      setFile(null);
      temp = null;
    } else {
      alert("click on submit button once again");
      setIsLoading(false);
    }

    // dispatch(
    //   adminAddAdmin({
    //     name,
    //     email,
    //     department,
    //     contactNumber,
    //     dob: dob.split("-").reverse().join("-"),
    //   })
    // );
  };

  useEffect(() => {
    if (admin.adminAddAdmin) {
      setError({});
    }
  }, [admin.adminAddAdmin]);

  useEffect(() => {
    if (storeError || admin.adminAddAdmin) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [storeError, admin.adminAddAdmin]);

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
              <div className="col-lg-8 mt-4">
                <div className="col-lg-8 mb-4">
                  <InstructionBox list={list} />
                </div>
                <form noValidate onSubmit={formhandler}>
                  {/* <div className="row"> */}
                  <div className="col-lg-8 col-md-6">
                    {/* <div className="form-group mb-3">
                      <label htmlFor="nameId">Admin Name</label>
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
                    </div>
                    <div className="form-group mb-3">
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
                    </div> */}

                    <div className="form-group mb-3">
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
                        <div className="invalid-feedback">
                          {error.department}
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
                  {/* <div className="col-md-6">
                    <div className="form-group mb-3">
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
                    <div className="form-group mb-3">
                      <label htmlFor="numberId">Contact Number</label>
                      <input
                        onChange={(e) => setContactNumber(e.target.value)}
                        type="number"
                        className={classnames("form-control", {
                          "is-invalid": error.contactNumber,
                        })}
                        id="numberId"
                      />
                      {error.contactNumber && (
                        <div className="invalid-feedback">
                          {error.contactNumber}
                        </div>
                      )}
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
                    <button type="submit" className="btn btn-secondary  ">
                      Add Admin
                    </button>
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
};

export default AdminAddAdmin;
