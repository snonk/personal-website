import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { post } from "../../utilities";

import "./SingleGameEntry.css";

/**
 * Renders a single game entry
 */
const SingleGameEntry = (props) => {
  const navigate = useNavigate();
  const joinRoom = () => {
    post("/projset/api/joinRoom", props.game);
    navigate("/projset/game");
  };
  return (
    <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
      <Button variant="contained" onClick={joinRoom}>
        {props.game.id} {props.game.name} {props.game.owner}
      </Button>
    </div>
  );
};

export default SingleGameEntry;
