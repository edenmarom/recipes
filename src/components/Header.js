import React, { useEffect } from 'react';
import logo from '../images/logo.png';
import { Link } from "react-router-dom";

const Header = (props) => {
  useEffect(()=>{
    const links = document.getElementsByTagName("a")
    for(let link of links){
      if(window.location.href === link.href){
        link.style.color = "CornflowerBlue"
      }

    }
  } , [])

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
              <Link className="nav-link" to="myPage">
                My Recipes
              </Link>
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
            {
              <li className="nav-item">
                <button
                  className="nav-link btn btn-sm btn-primary"
                  onClick={() => {
                    console.log("logout");
                  }}
                >
                  Logout
                </button>
              </li>
            }
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;