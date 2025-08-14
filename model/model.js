const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  quotes: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("project", dataSchema);
