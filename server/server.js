require("dotenv").config();

const http = require("http");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

const api = require("./api");                    // portfolio API
const projsetApi = require("./projset/api");

const auth = require("./projset/auth");
const socketManager = require("./projset/server-socket");
const validator = require("./projset/validator");

// validator (optional)
validator.checkSetup();

// Mongo
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "projset",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

const app = express();

app.use(validator.checkRoutes);

app.use(express.json());

// sessions for projset login
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// populate req.user
app.use(auth.populateCurrentUser);

// portfolio API
app.use("/api", api);

// projset API
app.use("/projset/api", projsetApi);

// React build
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// React Router fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;

  if (status === 500) {
    console.log(err);
  }

  res.status(status).send({
    status,
    message: err.message,
  });
});

const port = process.env.PORT || 3000;

const server = http.Server(app);

// initialize Socket.IO
socketManager.init(server);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});