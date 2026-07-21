import React, { useState, useEffect } from "react";
import Lobby from "../modules/Lobby.jsx";
import NewGamePopup from "../modules/NewGamePopup.jsx";
import { get, post } from "../../utilities";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    get("/projset/api/currentGame").then((data) => {
      if (data.inGame) {
        setCurrentGame(data);
      }
    });
  }, []);

  if (currentGame) {
    return <div style={{
      display: 'flex', minHeight: '70vh', justifyContent: 'center', alignItems: 'center'
    }
    }>
      <Button variant="contained"
        onClick={() => navigate("/projset/game")}
      >
        Resume Current Game
      </Button>
    </div >
  }

  return (
    <>
      <div className="lobby-container">
        <Lobby />
        <div id="create-button">
          <Button variant="contained" onClick={openPopup}>
            Create game
          </Button>
        </div>
        {isPopupOpen && <NewGamePopup onClose={closePopup} />}
      </div>
    </>
  );
};

export default Home;
