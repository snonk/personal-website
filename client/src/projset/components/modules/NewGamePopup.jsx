import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../utilities";
import Button from "@mui/material/Button";
import { Input as BaseInput } from "@mui/base/Input";
import { styled } from "@mui/system";

import "./NewGamePopup.css";
import "../../utilities.css";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const InputElement = styled("input")(
  ({ theme }) => `
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const Input = React.forwardRef(function CustomInput(props, ref) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
});

const NewGamePopup = ({ onClose }) => {
  const [roomName, setRoomName] = React.useState("");
  const navigate = useNavigate();
  const createRoom = () => {
    const room = { name: roomName };
    post("/projset/api/newRoom", room);
    navigate("/projset/game");
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Create a game</h2>
        <Input
          aria-label="Demo input"
          placeholder="Room name"
          value={roomName}
          onChange={(event) => {
            event.preventDefault();
            setRoomName(event.target.value);
          }}
        // 
        />
        {/* <br/> */}
        <Button variant="contained" sx={{ margin: "1em" }} onClick={createRoom}>
          Create Game
        </Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default NewGamePopup;
