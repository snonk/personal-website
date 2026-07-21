import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
// import GoogleLogin, { GoogleLogout } from "react-google-login";
import Button from "@mui/material/Button";

import "./NavBar.css";
import ProfileMenu from "./ProfileMenu";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "640438909208-e6tih9juu6j6n5579nhimik1nbs7jnj0.apps.googleusercontent.com";


/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = ({ handleLogin, handleLogout, userId }) => {
  const navigate = useNavigate();

  return (
    <nav className="NavBar-container">

      <Link to="/" className="NavBar-link">
        <img src="/favicon.ico" height="30em" />
      </Link>


      <div className="NavBar-linkContainer">
        <img src="/projset/favicon.png" height="25em" />
        <Link to="/projset/" className="NavBar-link" id="NavBar-title">
          projset
        </Link>
        {userId && (
          <Link to="home" className="NavBar-link">
            Lobby
          </Link>
        )}
        <Link to="help" className="NavBar-link">
          How to Play
        </Link>
      </div>
      <div id="profile-container">
        <ProfileMenu handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      </div>
    </nav>
  );
};

export default NavBar;
