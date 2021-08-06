import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import StudentSideNavbar from "../../components/StudentSideNavbar";
import StudentHomeHelper from "../../components/StudentHomeHelper";
import { studentUpdateProfile } from "../../redux/actions/studentActions";

const StudentUpdateProfile = (props) => {
  const studentUser = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const history = useHistory();
  const [gender, setGender] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!studentUser) history.push("/");
  }, [studentUser]);
  const formHandler = async (e) => {
    e.preventDefault();
    const id = studentUser.student.student._id;
    setIsLoading(true);
    dispatch(
      studentUpdateProfile({
        name,
        gender,
        contactNumber,
        aadharCard,
        id,
        history,
      })
    );
  };

  useEffect(() => {
    if (studentUser.updateProfile) {
      setIsLoading(false);
    }
  }, [studentUser.updateProfile]);
  return (
    <div>
      {studentUser.isAuthenticated ? (
        <>
          <div className="container-fluid">
            <div className="hide-print header">
              <StudentHomeHelper />
            </div>
            <div style={{ height: "11vh" }}></div>
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-5 position-fixed sidebar">
                <StudentSideNavbar />
              </div>
              <div className="col-lg-4 col-md-1 col-sm-1"></div>
              <div className="col-lg-6 col-md-5 mt-5">
                <form onSubmit={formHandler}>
                  <div className="form-group w-75 my-3">
                    <label htmlFor="studentName">Name</label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      required
                      type="text"
                      className="form-control"
                      id="studentName"
                    />
                  </div>
                  <div className="form-group w-75 my-3">
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
                  <div className="form-group w-75 my-3">
                    <label htmlFor="numberId">Contact Number</label>
                    <input
                      onChange={(e) => setContactNumber(e.target.value)}
                      required
                      type="number"
                      className="form-control"
                      id="numberId"
                    />
                  </div>
                  <div className="form-group w-75 my-3">
                    <label htmlFor="aadharId">Aadhar Card Number</label>
                    <input
                      onChange={(e) => setAadharCard(e.target.value)}
                      type="number"
                      className="form-control"
                      id="aadharId"
                    />
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
                    <button type="submit" className="btn btn-secondary">
                      Update
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

export default withRouter(StudentUpdateProfile);
