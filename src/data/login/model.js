let mongoose = require("mongoose")

let model = new mongoose.Schema({
  email : String,
  pass : String,
  cart : Array,
  wish : Array,
  products : Array,
  orders : Array,
  history : Array
})

module.exports = mongoose.model("users",model)