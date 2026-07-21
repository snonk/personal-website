import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../../utilities.css";
import { post } from "../../utilities";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {

  return (
    <>
      <div className="text">
        <h1>Welcome to Projective Set!</h1>
        {userId ? <p>Click on lobby to join a game!</p> : (<p>Create an account and read the rules to play!</p>)}

      </div>
    </>
  );
};

export default Skeleton;
