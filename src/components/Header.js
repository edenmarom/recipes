import React, { useEffect, useState, useContext } from 'react';
import logo from '../images/logo.png';
import AuthContext from '../store/AuthContext'
import { Link } from "react-router-dom";


const Header = () => {

  const authCtx = useContext(AuthContext);
  const loggin = authCtx.isLoggedin;
  const handleLogout = () => {
    authCtx.logout();
  };

  useEffect(() => {
    const links = document.getElementsByTagName("a")
    for (let link of links) {
      if (window.location.href === link.href) {
        link.style.color = "CornflowerBlue"
      }

    }
  }, [])


  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="">
          <img className="logo" src={logo} alt=""></img>
        </Link>
        <Link className="navbar-brand" to="">
          Recipes Website
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="recipes">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              {loggin && <Link className="nav-link" to="UserProfile">
                User Profile
              </Link>}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="admin">
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="about">
                About
              </Link>
            </li>
            {!loggin && (
              <li className="nav-item">
                <Link className="nav-link" to='/login'>Login</Link>
              </li>
            )}
            {loggin && (
              <li className="nav-item">
                <Link className="nav-link" to='/myPage'>My Recipes</Link>
              </li>
            )}
            {loggin && (
              <li className="nav-item">
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );

}

export default Header;