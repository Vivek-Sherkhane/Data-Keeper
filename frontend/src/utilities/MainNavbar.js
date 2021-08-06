import React from "react";
import { Link } from "react-router-dom";

function MainNavbar() {
  return (
    <div style={{ zIndex: "99" }}>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light nav-container"
        style={{ borderBottom: "0.5px solid black" }}
      >
        <div>
          <Link to="/" className="navbar-brand px-3">
            DATA KEEPER
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse ml-auto"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              {" "}
              <Link to="/" className="main-nav-item">
                <a className="nav-link text-dark" href="#">
                  HOME
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                ABOUT
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                CONTACT US
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                LOGIN
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" to="/studentlogin">
                  STUDENT
                </Link>
                <Link className="dropdown-item" to="/facultylogin">
                  FACULTY
                </Link>
                <Link className="dropdown-item" to="/adminlogin">
                  ADIMN
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default MainNavbar;
