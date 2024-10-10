const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  categories:{
    type:String,
    required:true
  },
  doi:{
    type:String,
    required:true
  },
  abstract:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("papers", paperSchema);
