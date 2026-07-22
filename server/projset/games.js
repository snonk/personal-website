// import { generateDeck, checkSet } from '/client/src/ts/game.js';
const socketManager = require("./server-socket");
const User = require("./models/user");
let ObjectId = require("mongodb").ObjectId;
/**
 * games consists of all ongoing games mapped by game ID.
 *
 * gameid => {deck: Array[Number], board: Array[Number], players: Array[PlayerObject], scores: Object[uid -> score]}
 */
let games = {
  // 0: createGame(0, [{uid:0, name:"John"}])
}; // maps gameID to game

let userIDToGameIDMap = {};

const k = 250;

const getGameByID = (gameID) => games[gameID];
const getGameIDByuserID = (userID) => userIDToGameIDMap[userID];

function generateDeck() {
  const deck = [];
  for (let rank = 1; rank <= 13; rank++) {
    for (let suit = 0; suit < 4; suit++) {
      deck.push(rank + (suit << 4));
    }
  }
  // shuffle the deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function checkSet(cards) {
  if (cards.length == 0) return false; // empty set does not count

  let result = 0;
  for (const card of cards) {
    result ^= card;
  }
  if (result == 0) return true;
  return false;
}

const updateStats = async (game, winner) => {
  let Q = {};
  let totalSets = Object.values(game.scores).reduce((a, b) => a + b, 0);
  for (const uid of game.players) {
    await User.findById(uid).then((user) => {
      Q[uid] = 10 ** (user.elo / 800);
    });
  }
  console.log(Q);
  E = {};
  Qsum = Object.values(Q).reduce((a, b) => a + b, 0);
  for (const uid of game.players) {
    E[uid] = Q[uid] / Qsum;
  }
  for (const uid of game.players) {
    await User.findById(uid).then((user) => {
      console.log(ObjectId(uid));
      let newElo = user.elo + k * (game.scores[uid] / totalSets - E[uid]);
      console.log(user.name + " elo: " + newElo);
      user.elo = newElo;
      if (uid === winner) user.won += 1;
      else user.lost += 1;
      user.save();
    });
  }
};

const createGame = (userID) => {
  let gameID = getRoomIDByuserID(userID);
  let room = roomIDToRoomMap[gameID];
  let deck = generateDeck();
  let game = {
    deck: deck.slice(7),
    board: deck.slice(0, 7),
    players: room.players,
    names: room.names,
    elos: room.elos,
    scores: room.players.reduce((scores, player) => {
      scores[player] = 0;
      return scores;
    }, {}),
  };
  games[gameID] = game;
  for (const uid of room.players) {
    userIDToGameIDMap[uid] = gameID;
  }
  let scoresElosByName = getScoresElosByName(game);
  for (const uid of game.players) {
    socketManager.getSocketFromUserID(uid).emit("set", game.board, scoresElosByName);
  }
  let roomIndex = rooms.indexOf(room);
  rooms.splice(roomIndex, 1);
  delete roomIDToRoomMap[gameID];
  for (const uid of game.players) {
    delete userIDToRoomIDMap[uid];
  }
  socketManager.getIo().emit("updateRooms", rooms);
  return game;
};

const getCurrentGame = (userId) => {
  const gameID = userIDToGameIDMap[userId];
  const roomID = userIDToRoomIDMap[userId];

  if (roomID === undefined && gameID === undefined) {
    return { inRoom: false, inGame: false };
  }
  if (gameID === undefined) {
    return { inRoom: true, inGame: false };
  }
  else {
    return {
      inGame: true,
      board: games[gameID].board,
      scores: getScoresElosByName(games[gameID]),
    };
  }
}

const getScoresElosByName = (game) => {
  let scores = {};
  for (const uid of game.players) {
    scores[game.names[uid]] = { score: game.scores[uid], elo: game.elos[uid] };
  }
  return scores;
};

const updateGame = (set, uid) => {
  let game = getGameByID(getGameIDByuserID(uid));
  if (!game) return;

  // cards must still be on the board
  for (const card of set) {
    if (!game.board.includes(card)) {
      return; // stale submission
    }
  }

  // must form a valid set
  if (!checkSet(set)) return;

  game.scores[uid] += 1;

  for (let i = 0; i < game.board.length; i++) {
    if (set.includes(game.board[i])) {
      console.log(i);
      game.board[i] = game.deck[0];
      game.deck = game.deck.slice(1);
    }
    if (game.deck.length === 0) {
      game.board.splice(i, 1);
    }
  }
  let scoresElosByName = getScoresElosByName(game);
  for (const uid of game.players) {
    socketManager.getSocketFromUserID(uid).emit("set", game.board, scoresElosByName);
  }

  User.findById(uid).then((user) => User.updateOne({ _id: uid }, { sets: user.sets + 1 }));

  // GAME END
  if (game.board.length < 7 || (game.deck.length == 0 && checkSet(game.board))) {
    const winner = Object.keys(game.scores).reduce((p1, p2) =>
      game.scores[p1] > game.scores[p2] ? p1 : p2
    );

    updateStats(game, winner).then(() => {
      for (const uid of game.players) {
        socketManager.getSocketFromUserID(uid).emit("endgame", game.names[winner]);
        removeUser(uid);
      }
    });
  }
};

let rooms = [];
let roomIDToRoomMap = {};
let userIDToRoomIDMap = {};

const getRoomIDByuserID = (userID) => userIDToRoomIDMap[userID];
let id = 0;

const getAllRooms = () => rooms;

const newRoom = async (game, userID) => {

  leaveRoom(userID); // leave room if already in one
  time = new Date().toLocaleTimeString([], { timeStyle: 'short' });

  const room = {
    ...game,
    id,
    owner: "",
    players: [userID],
    names: {},
    elos: {},
    time,
  };

  // Register immediately
  rooms.push(room);
  roomIDToRoomMap[id] = room;
  userIDToRoomIDMap[userID] = id;

  id++;

  // Now fetch user info
  const info = await getNameEloByID(userID);

  room.owner = info.name;
  room.names[userID] = info.name;
  room.elos[userID] = info.elo;

  socketManager.getIo().emit("updateRooms", rooms);

  const socket = socketManager.getSocketFromUserID(userID);
  if (socket) {
    socket.emit("updateRoom", room);
  }
};

const getNameEloByID = async (userID) => {
  let name = "";
  let elo = 0;
  await User.findById(userID).then((user) => {
    name = user.name;
    elo = user.elo;
  });
  return { name: name, elo: elo };
};

const joinRoom = (room, userID) => {
  if (getRoomIDByuserID(userID) === room.id) {
    return;
  }
  removeUser(userID);

  getNameEloByID(userID).then((info) => {
    if (roomIDToRoomMap[room.id].players.includes(userID)) return;
    roomIDToRoomMap[room.id].players = roomIDToRoomMap[room.id].players.concat(userID);
    roomIDToRoomMap[room.id].names[userID] = info.name;
    roomIDToRoomMap[room.id].elos[userID] = info.elo;
    userIDToRoomIDMap[userID] = room.id;
    socketManager.getIo().emit("updateRooms", rooms);
    for (const uid of roomIDToRoomMap[room.id].players) {
      socketManager.getSocketFromUserID(uid).emit("updateRoom", roomIDToRoomMap[room.id]);
    }
  });
};

const getRoom = (userID) => {
  let room = roomIDToRoomMap[userIDToRoomIDMap[userID]];
  console.log(room);
  if (room === undefined) {
    return { players: [], names: {}, elos: {} };
  }
  return roomIDToRoomMap[userIDToRoomIDMap[userID]];
};

const leaveRoom = (userID) => {
  if (userIDToRoomIDMap[userID] !== undefined) {
    let roomID = userIDToRoomIDMap[userID];
    let room = roomIDToRoomMap[roomID];
    let index = room.players.indexOf(userID);
    room.players.splice(index, 1);
    delete room.names[userID];
    delete room.elos[userID];
    delete userIDToRoomIDMap[userID];
    if (room.players.length === 0) {
      const roomIndex = rooms.indexOf(room);
      rooms.splice(roomIndex, 1);
      delete roomIDToRoomMap[roomID];
    } else {
      for (const uid of room.players) {
        socketManager.getSocketFromUserID(uid).emit("updateRoom", room);
      }
    }
    socketManager.getIo().emit("updateRooms", rooms);
  }
}

const leaveGame = (userID) => {
  if (userIDToGameIDMap[userID] !== undefined) {
    let gameID = userIDToGameIDMap[userID];
    let game = games[gameID];
    let index = game.players.indexOf(userID);
    game.players.splice(index, 1);
    delete game.names[userID];
    delete game.elos[userID];
    delete game.scores[userID];
    delete userIDToGameIDMap[userID];
    if (game.players.length === 0) {
      delete games[gameID];
    }
  }
  return;
}

const removeUser = (userID) => {
  leaveGame(userID);
  leaveRoom(userID);
};

module.exports = {
  getAllRooms: getAllRooms,
  newRoom: newRoom,
  joinRoom: joinRoom,
  getRoom: getRoom,
  getRoomIDByuserID: getRoomIDByuserID,
  getGameByID: getGameByID,
  updateGame: updateGame,
  createGame: createGame,
  removeUser: removeUser,
  getCurrentGame: getCurrentGame,
};
