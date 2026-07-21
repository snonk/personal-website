import React, { useState, useEffect, useLayoutEffect } from "react";
import { generateDeck, checkSet } from "../../utils/game-utils.js";
import SetCard from "../modules/card.jsx";
import { Scores } from "../modules/Scores.jsx";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useHotkeys } from "react-hotkeys-hook";
import CardContent from '@mui/material/CardContent';

import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";
import EndGamePopup from "../modules/EndGamePopup.jsx";

import { useNavigate } from "react-router-dom";

export const Game = (props) => {
  const [waitRoomScores, setWaitRoomScores] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [board, setBoard] = useState([]);
  const [deck, setDeck] = useState([]);
  const [gameId, setGameId] = useState(0);
  const [selected, setSelected] = useState([]);
  const [scores, setScores] = useState([]);
  const [winner, setWinner] = useState("");
  const [random, setRandom] = useState(Math.floor(Math.random() * 100000));
  const navigate = useNavigate();

  const leaveGame = async () => {
    post("/projset/api/removeUser");
    navigate("/projset/home");
  };

  useEffect(() => {
    get("/projset/api/getRoom").then((data) => {
      console.log(data.room);
      setWaitRoomScores(getWaitRoomScores(data.room));
    });
  }, []);

  useEffect(() => {
    get("/projset/api/currentGame").then(data => {
      if (!data.inGame) {
        if (!data.inRoom) {
          navigate("/projset/home");
        }
        return;
      }

      setBoard(data.board);
      setScores(data.scores);
      setGameStarted(true);
    });
  }, []);

  useEffect(() => {
    socket.on("updateRoom", (room) => {
      setWaitRoomScores(getWaitRoomScores(room));
    });
    return () => {
      socket.off("updateRoom", (room) => {
        setWaitRoomScores(getWaitRoomScores(room));
      });
    };
  }, []);

  const getWaitRoomScores = (room) => {
    let scores = {};
    for (const uid of room.players) {
      scores[room.names[uid]] = { score: 0, elo: room.elos[uid] };
    }
    return scores;
  };

  const handleSelect = (card) => {
    if (gameEnded) return;
    if (selected.includes(card)) {
      setSelected(selected.filter((c) => c !== card));
    } else {
      setSelected([card, ...selected]);
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (gameEnded) return;
    post("/projset/api/set", { set: selected });

    setSelected([]);
  };

  const getAllSubsets = (arr) =>
    arr.reduce((subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])), [[]]);

  const findSet = (board) => {
    let subsets = getAllSubsets(board);
    for (const subset of subsets) {
      if (subset.length !== 0 && subset.reduce((acc, card) => acc ^ card, 0) === 0) {
        console.log(subset.map((card) => board.indexOf(card)));
        return;
      }
    }
  };

  useLayoutEffect(() => {
    const updateGame = (board, scores) => {
      setBoard(board);
      setScores(scores);
      setGameStarted(true);
      setSelected([]);
      console.log("CLICK THESE INDICES TO SELECT THE PROJECTIVE SET:");
      findSet(board);
    };
    socket.on("set", updateGame);
    return () => {
      socket.off("set", updateGame);
    };
  }, []);

  useEffect(() => {
    const endGame = (win_name) => {
      setGameEnded(true);
      setWinner(win_name);
    };
    socket.on("endgame", endGame);
    return () => {
      socket.off("endgame", endGame);
    };
  }, []);

  const startGame = () => {
    setGameStarted(true);
    post("/projset/api/startgame", {});
  };

  const keyMap = {
    a: 0,
    s: 1,
    d: 2,
    f: 3,
    z: 4,
    x: 5,
    c: 6,
  };

  for (const k of Object.keys(keyMap)) {
    useHotkeys(
      k,
      () => {
        handleSelect(board[keyMap[k]]);
      },
      [selected]
    );
  }
  useHotkeys("enter", handleSubmit, [selected]);

  return gameStarted ? (
    <div className="game">
      <div className="board">
        {board.map((card, idx) => (
          <SetCard
            key={idx}                 // stable slot
            content={card}
            selected={selected.includes(card)}
            handleSelect={handleSelect}
          />
        ))}
        {/* <EndGamePopup/> */}
        {gameEnded ? <EndGamePopup winner={winner} /> : <></>}
      </div>
      <div className="rightBar">
        <Scores scores={scores} />

        <Button
          onClick={handleSubmit}
          style={{ marginRight: "5%" }}
          variant="contained"
          idname="submit-button"
        >
          Submit
        </Button>

        <Button
          onClick={leaveGame}
          variant="outlined"
          color="error"
        >
          Leave Game
        </Button>
      </div>
    </div>
  ) : (
    <div className="game">
      <div className="board">
        {
          [0, 0, 0, 0, 0, 0, 0].map((_, i) => {
            return <Card sx={{ maxWidth: 100, display: 'inline-block', margin: 2, boxShadow: 2, }}
              key={i}>
              <CardContent style={{ padding: "4px 4px 0px 4px" }}>
                <img
                  src={"/projset/BACK.svg"}
                  style={{ width: "100%" }}
                />
              </CardContent>
            </Card>
          })

        }

      </div>
      <div className="rightBar">
        <Button onClick={startGame} style={{ marginRight: "5%" }} variant="contained">
          Start
        </Button>

        <Button
          onClick={leaveGame}
          variant="outlined"
          color="error"
        >
          Leave Game
        </Button>

        <Scores scores={waitRoomScores} />
      </div>
    </div>
  );
};
