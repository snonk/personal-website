/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const fs = require("fs");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
// const socketManager = require("./server-socket");

router.get("/projects", (_req, res) => {
  const projects = JSON.parse(fs.readFileSync('./server/projects.json'));
  res.status(200).send(projects);
});

router.get("/gallery", (req, res) => {
  const files = fs.readdirSync('./client/dist/art/' + req.query.path);
  res.status(200).send(files.map((file) => '/art/' + req.query.path + file));
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
