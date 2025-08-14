const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OpinionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  direction: {
   type: String,
   required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Opinion = mongoose.model("Opinion", OpinionSchema);

module.exports = Opinion;
