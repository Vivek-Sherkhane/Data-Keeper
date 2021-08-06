import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminHomehelper from "../../components/AdminHomehelper";
import { AdminGetAllStudents } from "../../redux/actions/adminActions";
import classnames from "classnames";
import AdminSideNavbar from "../../components/AdminSideNavbar";

const AdminGetStudents = (props) => {
  const admin = useSelector((state) => state.admin);
  const storeError = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({});

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(AdminGetAllStudents({ department, year }));
  };

  useEffect(() => {
    if (admin.studentList.length !== 0) {
      setIsLoading(false);
    }
  }, [admin.studentList.length]);
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
              <div className="col-lg-4 col-md-1"></div>
              <div className="col-lg-6 col-md-4 my-4">
                <form noValidate onSubmit={formHandler}>
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
                      <div className="invalid-feedback">{error.department}</div>
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
                      className="btn btn-secondary btn-block  my-2"
                    >
                      Search
                    </button>
                  )}
                </form>

                {admin.studentList.length !== 0 ? (
                  <table className="table border">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Registration Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Section</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admin.studentList.map((res, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{res.registrationNumber}</td>
                          <td>{res.name}</td>
                          <td>{res.email}</td>
                          <td>{res.section}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>
                    <h2>No Student found</h2>
                  </div>
                )}
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

export default AdminGetStudents;
