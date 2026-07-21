import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../utilities";
import Button from "@mui/material/Button";

import "./NewGamePopup.css";
import "../../utilities.css";

const EndGamePopup = (props) => {

  const navigate = useNavigate();

  return (
    <div sx={{ position: "relative" }}>
      <div id="end-popup">
        <div className="popup">
          <h2>Game ended</h2>
          <p>Winner: {props.winner}</p>
          <Button variant="contained" onClick={() => navigate("/projset/home")}>Back to lobby</Button>
        </div>
      </div>
    </div>
  );
};

export default EndGamePopup;
