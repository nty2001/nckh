const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  post: {
    type: Number,
  },
  user_id: {
    type: String,
    required: true
  },
});
module.exports = mongoose.model("Note", noteSchema);
