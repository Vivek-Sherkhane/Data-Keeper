import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import FacultySideNavbar from "../../components/FacultySideNavbar";
import FacultyHomeHelper from "../../components/FacultyHomeHelper";
import {
  facultyLogout,
  facultyUpdateProfile,
} from "../../redux/actions/facultyactions";

const FacultyUpdateProfile = (props) => {
  const facultyUser = useSelector((state) => state.faculty);
  const dispatch = useDispatch();
  const history = useHistory();
  const [gender, setGender] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const imagehandler = (e) => {
  //     if (e.target.files && e.target.files[0]) {
  //         let img = e.target.files[0]
  //         setAvatar(img)
  //     }
  // }

  useEffect(() => {
    if (!facultyUser) history.push("/");
  }, [facultyUser]);
  const formHandler = async (e) => {
    e.preventDefault();
    const id = facultyUser.faculty.faculty._id;
    setIsLoading(true);
    dispatch(
      facultyUpdateProfile({
        name,
        gender,
        contactNumber,
        aadharCard,
        id,
        history,
      })
    );
    history.push("/");
  };

  useEffect(() => {
    if (facultyUser.updateProfile) {
      setIsLoading(false);
    }
  }, [facultyUser.updateProfile]);
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
              <div className="col-lg-6 col-md-5 mt-5">
                <form onSubmit={formHandler}>
                  {/* <div className="form-group">
                                    <label htmlFor="inputId">Profile Picture</label>
                                    <input required className="form-control" type="file" accept=".jpg,.png,.jpeg" id="inputId" onChange={imagehandler}></input>
                                </div> */}
                  <div className="form-group w-75 my-3">
                    <label htmlFor="facultyName">Name</label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      required
                      type="text"
                      className="form-control"
                      id="facultyName"
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
                          <span class="sr-only">Loading...</span>
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

export default withRouter(FacultyUpdateProfile);
