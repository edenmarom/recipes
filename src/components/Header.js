import React from 'react';
import logo from '../images/logo.png';


const Header = (props) => {
  return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand " href="/">
            <img className="logo" src={logo} alt=""></img>
          </a>
          <a className="navbar-brand" href="/">
            Recipes Website
          </a>
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
                <a className="nav-link" href="/recipes">
                  Recipes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/myPage">
                  My Recipes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin">
                  Admin
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
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