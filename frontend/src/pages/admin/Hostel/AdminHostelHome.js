import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import AdminHomehelper from "../../../components/AdminHomehelper";
import AdminSideNavbar from "../../../components/AdminSideNavbar";
import { Link } from "react-router-dom";

const AdminHostelHome = (props) => {
  const admin = useSelector((state) => state.admin);
  const storeError = useSelector((state) => state.error);

  const [error, setError] = useState({});

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
              <div className="col-lg-6 mt-5">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div key="1" className="card">
                      <Link to="/admin/addroom">
                        <img
                          className="medium"
                          src="../../../../images/hostel.png"
                          alt="hostel"
                        />
                      </Link>

                      <div className="card-body">
                        <Link to="/admin/addroom" className="card-link">
                          <h4>Add Room</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div key="1" className="card">
                      <Link to="/admin/viewroom">
                        <img
                          className="medium"
                          src="../../../../images/hostel.png"
                          alt="hostel"
                        />
                      </Link>
                      <div className="card-body">
                        <Link to="/admin/viewroom" className="card-link">
                          <h4>View Room Details</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div key="1" className="card">
                      <Link to="/admin/editroom">
                        <img
                          className="medium"
                          src="../../../../images/hostel.png"
                          alt="hostel"
                        />
                      </Link>

                      <div className="card-body">
                        <Link to="/admin/editroom" className="card-link">
                          <h4>Edit Room</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-4 col-md-6 col-sm-12">
                    <div key="1" className="card">
                      <img
                        className="medium"
                        src="../../../../images/hostel.png"
                        alt="hostel"
                      />
                      <div className="card-body">
                        <h4>Add Room</h4>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="card" style="width: 18rem;">
                    <img className="card-img-top" src="..." alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div> */}
            </div>
          </div>
        </>
      ) : (
        props.history.push("/")
      )}
    </div>
  );
};

export default AdminHostelHome;
