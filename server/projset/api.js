/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");
// const firebase = require("../client/src/firebase")

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

const gameManager = require("./games");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/whois", (req, res) => {
  User.findById(req.query.uid).then((user) => res.send(user));
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
/**
 *
 * @typedef UserObject
 * @property {string} uid
 * @property {string} name
 * req.set : Array[Number]
 * indices of selected cards
 */
router.post("/set", (req, res) => {
  gameManager.updateGame(req.body.set, req.user._id); // wtf is game id and fix user things
  res.send({});
});

router.get("/currentGame", (req, res) => {
  res.send(gameManager.getCurrentGame(req.user._id));
});

router.get("/games", auth.ensureLoggedIn, (req, res) => {
  res.send({ rooms: gameManager.getAllRooms() });
});

router.post("/newRoom", auth.ensureLoggedIn, (req, res) => {
  gameManager.newRoom(req.body, req.user._id);
  res.send({});
});

router.post("/joinRoom", auth.ensureLoggedIn, (req, res) => {
  gameManager.joinRoom(req.body, req.user._id);
  res.send({});
});

router.get("/getRoom", auth.ensureLoggedIn, (req, res) => {
  res.send({ room: gameManager.getRoom(req.user._id) });
});

router.post("/removeUser", auth.ensureLoggedIn, (req, res) => {
  gameManager.removeUser(req.user._id);
});

router.post("/startgame", auth.ensureLoggedIn, (req, res) => {
  gameManager.createGame(req.user._id);
  res.send({});
});

router.post("/stats", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id).then((user) => {
    res.send(user);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`PROJSET API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "PROJSET API route not found" });
});

module.exports = router;
