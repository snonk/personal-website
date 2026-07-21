const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  id: String,
  googleid: String,
  sets: Number,
  elo: Number,
  won: Number,
  lost: Number,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
