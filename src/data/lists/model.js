let mongoose = require("mongoose")

let model = new mongoose.Schema({
  img : String,
  name : String,
  category : String,
  description : String,
  mrp : Number,
  price : Number,
  rattings : Number,
  reviews : Array,
  stock : String,
  quantity : Number,
  size : String
})

exports.products  = mongoose.model("products",model);

exports.users = mongoose.model("users")