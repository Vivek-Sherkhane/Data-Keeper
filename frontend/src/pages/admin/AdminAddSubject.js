import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import AdminHomehelper from "../../components/AdminHomehelper";
import { adminAddSubject } from "../../redux/actions/adminActions";
import AdminSideNavbar from "../../components/AdminSideNavbar";

const AdminAddSubject = () => {
  const admin = useSelector((state) => state.admin);
  const storeError = useSelector((state) => state.error);
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  // const [totalLectures, setTotalLectures] = useState('')
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (storeError) {
      setError(storeError);
    }
  }, [store.error]);
  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      adminAddSubject({
        subjectCode,
        subjectName,
        //totalLectures,
        department,
        year,
      })
    );
  };

  useEffect(() => {
    if (admin.adminAddSubject) {
      setError({});
      setDepartment("");
      setSubjectCode("");
      setSubjectName("");
      setYear("");
    }
  }, [admin.adminAddSubject]);

  useEffect(() => {
    if (storeError || admin.adminAddSubject) {
      setIsLoading(false);
    }
  }, [storeError, admin.adminAddSubject]);

  return (
    <div>
      <>
        {" "}
        <div className="hide-print header">
          <AdminHomehelper />
        </div>
        <div style={{ height: "9.85vh" }}></div>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 position-fixed sidebar">
              <AdminSideNavbar />
            </div>
            <div className="col-lg-4 col-md-2"></div>
            <div className="col-md-6 col-lg-4">
              <div className=" justify-content-md-center mt-5">
                <form noValidate onSubmit={formHandler}>
                  <div className="form-group my-3">
                    <label htmlFor="snameId">Subject Name</label>
                    <input
                      onChange={(e) => setSubjectName(e.target.value)}
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": error.subjectName,
                      })}
                      id="snameId"
                    />
                    {error.subjectName && (
                      <div className="invalid-feedback">
                        {error.subjectName}
                      </div>
                    )}
                  </div>
                  <div className="form-group  my-3">
                    <label htmlFor="scodeId">Subject Code</label>
                    <input
                      onChange={(e) => setSubjectCode(e.target.value)}
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": error.subjectCode,
                      })}
                      id="scodeId"
                    />
                    {error.subjectCode && (
                      <div className="invalid-feedback">
                        {error.subjectCode}
                      </div>
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
                      <div className="invalid-feedback">{error.department}</div>
                    )}
                  </div>
                  <div className="form-group my-3">
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
                      Add Subject
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AdminAddSubject;
