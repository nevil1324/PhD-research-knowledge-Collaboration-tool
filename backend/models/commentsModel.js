const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  paperId: {
    type: String,
    required: true,
  },
  categories:[
    {
      type: String,
      required: true,
    },
  ],
  emailId:{
    type:String,
    reuired:true
  },
  comment: {
    type:String,
    reuired:true
  }
});

module.exports = mongoose.model("comments", commentSchema);
