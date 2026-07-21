import React, { useEffect, useState } from "react";
import SingleGameEntry from "./SingleGameEntry.jsx";
import { socket } from "../../client-socket.js";
import { post, get } from "../../utilities";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

/**
 * Component to display the lobby
 *
 * Proptypes
 */
const Lobby = (props) => {
  /**
   * @typedef UserObject
   * @property {string} _id
   * @property {string} name
   */
  /**
   * @typedef GameObject
   * @property {string} name
   */

  const [rooms, setRooms] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);

  const loadRooms = () => {
    get("/projset/api/games").then((data) => {
      setRooms(data.rooms);
    });
  };

  useEffect(() => {
    document.title = "Lobby";
  }, []);

  useEffect(() => {
    loadRooms();

    get("/projset/api/currentGame").then((data) => {
      if (data.inGame) {
        setCurrentGame(data);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("updateRooms", setRooms);
    return () => {
      socket.off("updateRooms", setRooms);
    };
  }, []);

  const navigate = useNavigate();
  const joinRoom = (room) => {
    post("/projset/api/joinRoom", room);
    navigate("/projset/game");
  };

  return (
    <div className="lobby">
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Room name</TableCell>
              <TableCell align="right">Creator</TableCell>
              <TableCell align="right">Time created</TableCell>
              <TableCell align="right">Players</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow onClick={() => joinRoom(room)} className="lobby-row">
                <TableCell component="th" scope="row">
                  {room.name}
                </TableCell>
                <TableCell align="right">{room.owner}</TableCell>
                <TableCell align="right">{room.time}</TableCell>
                <TableCell align="right">{room.players.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Lobby;
