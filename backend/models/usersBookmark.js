const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
  },
  paperId: [
    {
      type: String,
      required: true,
    },
  ]
});

module.exports = mongoose.model("usersBookmark", bookmarkSchema);