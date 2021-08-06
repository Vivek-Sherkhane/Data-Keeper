import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import readXlsxFile from "read-excel-file";
import xlsx from "xlsx";
import FacultyHomeHelper from "../../components/FacultyHomeHelper";
import schema from "../../utilities/Schema";
import { useHistory } from "react-router-dom";
import {
  FacultyUploadMarksGetStudents,
  uploadMarks,
} from "../../redux/actions/facultyactions";
import FacultySideNavbar from "../../components/FacultySideNavbar";
import InstructionBox from "../../components/MessageBoxes/InstructionBox";

const FacultyUploadMarks = () => {
  const facultyUser = useSelector((state) => state.faculty);
  const storeError = useSelector((state) => state.error);
  const history = useHistory();
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [marks, setMarks] = useState([]);
  const [section, setSection] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [totalMarks, setTotalMarks] = useState();
  const [exam, setExam] = useState("");
  const [error, setError] = useState({});
  const [file, setFile] = useState(null);
  const [errorHelper, setErrorHelper] = useState({});
  const list = [
    "Roll Number ('Student Registration Number' and 'Roll Number' are same here)",
    "Marks",
  ];

  const handleInputChange = (value, _id) => {
    const newMarks = [...marks];
    let index = newMarks.findIndex((m) => m._id === _id);
    if (index === -1) {
      newMarks.push({ _id, value });
    } else {
      newMarks[index].value = value;
    }
    setMarks(newMarks);
  };

  useEffect(() => {
    if (storeError) {
      setError(storeError);
    }
  }, [storeError]);

  // useEffect(() => {
  //     if (storeError) {
  //         setErrorHelper(store.errorHelper)
  //     }
  // }, [store.errorHelper])

  const formHandler = (e) => {
    e.preventDefault();

    dispatch(FacultyUploadMarksGetStudents({ department, year, section }));
  };

  const secondFormHandler = async (e) => {
    e.preventDefault();
    let data = null;
    data = await readXlsxFile(file, { schema });
    console.log("data : ", data);
    let temp = null;
    temp = data.rows;
    // let temp2 = null;
    // temp2 = data.filter((item) => {
    //   return item != null && item[0].substring(0, 3) === "STU";
    // });
    // console.log(temp2);
    console.log("marks Array : ", marks);
    if (temp.length > 0) {
      setMarks(temp);
    }

    if (marks.length > 0) {
      dispatch(
        uploadMarks({
          subjectCode,
          exam,
          totalMarks,
          marks,
          department,
          section,
        })
      );
      setMarks([]);
      temp = null;
    } else {
      alert("click on submit button once again");
      //setIsLoading2(false);
    }
  };

  return (
    <div>
      {facultyUser.isAuthenticated ? (
        <>
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
              {facultyUser.uploadMarksFetchedStudentsHelper && (
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
                          id="bramchId"
                        >
                          <option>Select</option>
                          <option
                            value={facultyUser.faculty.faculty.department}
                          >
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
                          <div classNameName="invalid-feedback">
                            {error.year}
                          </div>
                        )}
                      </div>
                      {/* <div className="form-group">
                                <label htmlFor="semesterId">Semester</label>
                                <select onChange={(e) => setSemester(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.semester

                                    })} id="semesterId">
                                    <option>Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                                {error.year && (<div classNameName="invalid-feedback">{error.year}</div>)}
                            </div> */}
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
                      <button type="submit" className="btn btn-secondary">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {!facultyUser.uploadMarksFetchedStudentsHelper && (
                <div className="col-lg-8 col-md-8 mt-4">
                  <div className="col-lg-8 mb-4">
                    <InstructionBox list={list} />
                  </div>
                  <form onSubmit={secondFormHandler}>
                    <div className="col-lg-8 col-md-8">
                      <div className="form-group my-2">
                        <label htmlFor="subjectId">Subject Code</label>
                        <select
                          onChange={(e) => setSubjectCode(e.target.value)}
                          className={classnames("form-control", {
                            "is-invalid": errorHelper.subjectCode,
                          })}
                          id="subjectId"
                        >
                          <option>Select</option>
                          {facultyUser.uploadMarksSubjectCodeList.map(
                            (subjectCodeName) => (
                              <option>{subjectCodeName}</option>
                            )
                          )}
                        </select>
                        {errorHelper.subjectCode && (
                          <div classNameName="invalid-feedback">
                            {errorHelper.subjectCode}
                          </div>
                        )}
                      </div>
                      <div className="form-group my-2">
                        <label htmlFor="examId">Exam</label>
                        <select
                          onChange={(e) => setExam(e.target.value)}
                          value={exam}
                          className={classnames("form-control", {
                            "is-invalid": errorHelper.exam,
                          })}
                          id="examId"
                        >
                          <option>Select</option>
                          <option value="Minor1">Minor 1</option>
                          <option value="Minor2">Minor 2</option>
                          <option value="Annual">Annual</option>
                        </select>
                        {errorHelper.exam && (
                          <div classNameName="invalid-feedback">
                            {errorHelper.exam}
                          </div>
                        )}
                      </div>

                      <div className="form-group my-2">
                        <label htmlFor="marksId">Total Marks</label>
                        <input
                          type="number"
                          className={classnames("form-control", {
                            "is-invalid": errorHelper.totalMarks,
                          })}
                          id="marksId"
                          value={totalMarks}
                          onChange={(e) => setTotalMarks(e.target.value)}
                        />
                        {errorHelper.totalMarks && (
                          <div classNameName="invalid-feedback">
                            {errorHelper.totalMarks}
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

                      {/* <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Registration Number</th>
                          <th scope="col">Student Name</th>
                          <th scope="col">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {facultyUser.uploadMarksStudentsList.map(
                          (obj, index) => (
                            <tr key={index}>
                              <td>{obj.registrationNumber}</td>
                              <td>{obj.name}</td>
                              <td>
                                <div className="form-check">
                                  <input
                                    className="form-control"
                                    required
                                    type="number"
                                    value={obj.marks}
                                    onChange={(e) =>
                                      handleInputChange(e.target.value, obj._id)
                                    }
                                    id="defaultCheck1"
                                  />
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table> */}
                      <button type="submit" className="btn btn-secondary ml-1">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default FacultyUploadMarks;
