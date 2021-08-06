import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import readXlsxFile from "read-excel-file";
import classnames from "classnames";
import FacultyHomeHelper from "../../components/FacultyHomeHelper";
import { useHistory } from "react-router-dom";
import {
  FacultyGetStudents,
  FacultyMarkAttendence,
} from "../../redux/actions/facultyactions";
import FacultySideNavbar from "../../components/FacultySideNavbar";
import InstructionBox from "../../components/MessageBoxes/InstructionBox";

const FacultyMarkAttendance = (props) => {
  const facultyUser = useSelector((state) => state.faculty);
  const storeError = useSelector((state) => state.error);
  const history = useHistory();
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});
  const [flag, setFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const list = [
    "Roll Number ('Student Registration Number' and 'Roll Number' are same here)",
  ];
  const handleInputChange = (e) => {
    const tempCheck = checkedValue;
    let index;
    if (e.target.checked) {
      tempCheck.push(e.target.value);
    } else {
      index = tempCheck.indexOf(e.target.value);
      tempCheck.splice(index, 1);
    }
    setCheckedValue(tempCheck);
  };

  useEffect(() => {
    if (storeError) {
      setError(storeError);
    }
  }, [storeError]);

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(FacultyGetStudents({ department, year, section }));
  };

  useEffect(() => {
    if (storeError || !facultyUser.fetchedStudentsHelper) {
      setIsLoading(false);
    }
  }, [storeError, facultyUser.fetchedStudentsHelper]);

  const secondFormHandler = async (e) => {
    e.preventDefault();
    setIsLoading2(true);
    let data = null;
    data = await readXlsxFile(file);
    console.log(data);
    let temp2 = null;
    temp2 = data.map((item) => {
      return item[0];
    });
    console.log(temp2);
    let temp = null;
    temp = temp2.filter((item) => {
      return item != null && item.substring(0, 3) === "STU";
    });
    console.log(temp);
    if (temp.length > 0) {
      setDataArray(temp);
      temp = null;
      temp2 = null;
      data = null;
      console.log(dataArray);
    }
    if (dataArray.length > 0) {
      //console.log(dataArray);
      dispatch(
        FacultyMarkAttendence({
          dataArray,
          subjectCode,
          department,
          year,
          section,
        })
      );
      //setCheckedValue([]);
      setDataArray([]);
      temp = null;
      temp2 = null;
      data = null;
      //console.log(dataArray);
    } else {
      alert("click ok and submit once again");
      setIsLoading2(false);
    }
    //console.log(dataArray);
  };
  // console.log(dataArray);
  // useEffect(() => {
  //   if (facultyUser.marksUploadedSuccessfullyHelper) {
  //     setDataArray([]);
  //   }
  // }, [facultyUser.marksUploadedSuccessfullyHelper]);

  useEffect(() => {
    if (facultyUser.fetchedStudentsHelper) {
      setIsLoading2(false);
    }
  }, [facultyUser.fetchedStudentsHelper]);

  return (
    <div>
      {facultyUser.isAuthenticated ? (
        <div className="container-fluid">
          <div className="hide-print header">
            <FacultyHomeHelper />
          </div>
          <div style={{ height: "11vh" }}></div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-5 position-fixed sidebar">
              <FacultySideNavbar />
            </div>
            <div className="col-lg-4 col-md-1 col-sm-1"></div>

            {facultyUser.fetchedStudentsHelper && (
              <div className="col-lg-8 col-md-8 mt-4">
                <form noValidate onSubmit={formHandler}>
                  <div className="col-lg-8 col-md-8">
                    <div className="form-group my-2">
                      <label htmlFor="branchId">Department</label>
                      <select
                        onChange={(e) => setDepartment(e.target.value)}
                        className={classnames("form-control", {
                          "is-invalid": error.department,
                        })}
                        id="branchId"
                      >
                        <option>Select</option>
                        <option value={facultyUser.faculty.faculty.department}>
                          {facultyUser.faculty.faculty.department}
                        </option>
                      </select>
                      {error.department && (
                        <div classNameName="invalid-feedback">
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
                        <div classNameName="invalid-feedback">{error.year}</div>
                      )}
                    </div>

                    <div className="form-group my-2">
                      <label htmlFor="sectionId">Section</label>
                      <select
                        onChange={(e) => setSection(e.target.value)}
                        className={classnames("form-control", {
                          "is-invalid": error.section,
                        })}
                        id="sectionId"
                      >
                        <option>Select</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                      </select>
                      {error.section && (
                        <div classNameName="invalid-feedback">
                          {error.section}
                        </div>
                      )}
                    </div>
                    <div class="row justify-content-center">
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
                    </div>
                    {!isLoading && (
                      <button type="submit" className="btn btn-secondary my-2 ">
                        Search
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {!facultyUser.fetchedStudentsHelper && (
              <div className="col-lg-8 col-md-8 mt-4">
                <div className="col-lg-8 mb-4">
                  <InstructionBox list={list} />
                </div>
                <form onSubmit={secondFormHandler}>
                  <div className="col-lg-8 col-md-8 mt-4">
                    <div className="form-group my-2">
                      <label htmlFor="subjectId">Subject Code</label>
                      <select
                        required
                        onChange={(e) => setSubjectCode(e.target.value)}
                        className="form-control"
                        id="subjectId"
                      >
                        <option>Select</option>
                        {facultyUser.subjectCodeList.map((subjectCodeName) => (
                          <option>{subjectCodeName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group my-2">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </div>
                    {/* <table className="table">
                    <thead>
                      <tr>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="defaultCheck1"
                            />
                          </div>
                        </td>
                        <th scope="col">Registration Number</th>
                        <th scope="col">Student Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {facultyUser.studentsList.map((obj, index) => (
                        <tr>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={obj._id}
                                onChange={handleInputChange}
                                id="defaultCheck1"
                              />
                            </div>
                          </td>
                          <td key={index}>{obj.registrationNumber}</td>
                          <td>{obj.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                    <div class="row justify-content-center">
                      <div class="col-md-1">
                        {isLoading2 && (
                          <div
                            class="spinner-border text-primary"
                            role="status"
                          >
                            <span class="sr-only"></span>
                          </div>
                        )}
                      </div>
                    </div>
                    {!isLoading2 && (
                      <button
                        type="submit"
                        className="btn btn-secondary ml-1 my-2"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default FacultyMarkAttendance;
