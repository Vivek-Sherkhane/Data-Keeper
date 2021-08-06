import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import AdminHomehelper from "../../components/AdminHomehelper";
import { adminAddStudent } from "../../redux/actions/adminActions";
import AdminSideNavbar from "../../components/AdminSideNavbar";
import schema from "../../utilities/AddStudentSchema";
import readXlsxFile from "read-excel-file";
import excelToJson from "convert-excel-to-json";
import InstructionBox from "../../components/MessageBoxes/InstructionBox";

const AdminAddStudent = (props) => {
  const admin = useSelector((state) => state.admin);
  const storeError = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [studentMobileNumber, setContactNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherMobileNumber, setFatherContactNumber] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [error, setError] = useState({});
  const [file, setFile] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const list = [
    "Name",
    "Email",
    "Aadhar Card",
    "Date of Birth",
    "Gender",
    "Student Contact Number",
    "Father Name",
    "Father Contact Number",
  ];
  //const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (storeError) {
      setError(storeError);
    }
  }, [storeError]);
  const formHandler = async (e) => {
    e.preventDefault();
    let data = null;
    // data = excelToJson({
    //   sourceFile: file,
    // });
    data = await readXlsxFile(file, { schema });
    console.log(data);
    let temp = null;
    temp = data.rows;
    console.log("students data : ", studentsData);
    if (temp.length > 0) {
      setStudentsData(temp);
    }

    if (studentsData.length > 0) {
      dispatch(
        adminAddStudent({
          studentsData,
          year,
          department,
          section,
        })
      );
      setStudentsData([]);
      temp = null;
    } else {
      alert("click on submit button once again");
      //setIsLoading2(false);
    }
    //setIsLoading(true)
    // dispatch(
    //   adminAddStudent({
    //     name,
    //     email,
    //     year,
    //     department,
    //     fatherName,
    //     aadharCard,
    //     gender,
    //     section: section.toUpperCase(),
    //     dob: dob.split("-").reverse().join("-"),
    //     studentMobileNumber,
    //     fatherMobileNumber,
    //   })
    // );
  };
  useEffect(() => {
    if (admin.adminAddStudent) {
      setError({});
      setAadharCard("");
      setContactNumber("");
      setDepartment("");
      setDob("");
      setEmail("");
      setFatherContactNumber("");
      setFatherName("");
      setGender("");
      setName("");
      setSection("");
      setYear("");
    }
  }, [admin.adminAddStudent]);

  useEffect(() => {
    if (storeError || admin.adminAddStudent) {
      //setIsLoading(false)
    }
  }, [storeError, admin.adminAddStudent]);
  return (
    <div>
      {admin.isAuthenticated ? (
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
              <div className="col-lg-4 col-md-2"></div>
              <div className="col-lg-8 mt-4">
                <div className="col-lg-8 mb-4">
                  <InstructionBox list={list} />
                </div>
                <form noValidate onSubmit={formHandler}>
                  {/* <div className="row"> */}
                  <div className="col-lg-8 col-md-6 ">
                    {/* <div className="form-group my-2">
                      <label htmlFor="nameId">Student Name</label>
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
                    {/* <div className="form-group my-2">
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
                    <div className="form-group my-2">
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
                        <option value="I.T">I.T</option>
                        <option value="E.E.E">E.E.E</option>
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
                      <label htmlFor="yearId">Year</label>
                      <select
                        onChange={(e) => setYear(e.target.value)}
                        className={classnames("form-control", {
                          "is-invalid": error.year,
                        })}
                        id="yearId"
                      >
                        <option>Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                      {error.year && (
                        <div className="invalid-feedback">{error.year}</div>
                      )}
                    </div>

                    <div className="form-group my-2">
                      <label htmlFor="sectionId">Section</label>
                      <input
                        onChange={(e) => setSection(e.target.value)}
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": error.section,
                        })}
                        id="sectionId"
                      />
                      {error.section && (
                        <div className="invalid-feedback">{error.section}</div>
                      )}
                    </div>
                    <div className="form-group my-2">
                      <input
                        className="form-control"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      ></input>
                    </div>
                    {/* <div class="form-group my-2">
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
                    </div> */}

                    {/* <div className="col-lg-4"> */}

                    {/* <div className="form-group my-2">
                      <label htmlFor="genderId">Gender</label>
                      <select
                        onChange={(e) => setGender(e.target.value)}
                        class="form-control"
                        id="genderId"
                      >
                        <option>Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div> */}
                    {/* <div className="form-group my-2">
                      <label htmlFor="numberId">Contact Number</label>
                      <input
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                        type="number"
                        class="form-control"
                        id="numberId"
                      />
                    </div> */}
                    {/* <div className="form-group my-2">
                      <label htmlFor="fatherId">Father Name</label>
                      <input
                        onChange={(e) => setFatherName(e.target.value)}
                        type="text"
                        class="form-control"
                        id="fatherId"
                      />
                    </div> */}
                    {/* <div className="form-group my-2">
                      <label htmlFor="fathercnId">Father Contact Number</label>
                      <input
                        onChange={(e) => setFatherContactNumber(e.target.value)}
                        type="number"
                        className="form-control"
                        id="fathercnId"
                      />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="aadharId">Aadhar Card Number</label>
                      <input
                        onChange={(e) => setAadharCard(e.target.value)}
                        type="number"
                        className="form-control"
                        id="aadharId"
                      />
                    </div> */}

                    {/* </div> */}

                    {/* <div class="row justify-content-center">
                                    <div class="col-md-1 my-2">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </div>
                                </div> */}
                    <button type="submit" className="btn btn-secondary  ">
                      Add Student
                    </button>
                  </div>
                  {/* </div> */}
                </form>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </>
      ) : (
        props.history.push("/")
      )}
    </div>
  );
};

export default AdminAddStudent;
