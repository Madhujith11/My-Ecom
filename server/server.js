let express = require("express")

let mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ecom")

let cors = require("cors")

let login_route = require("M:/ecom/src/routes/login/loginroute.js")

let products_route = require("M:/ecom/src/routes/products/productsroute.js")

let list_route = require("M:/ecom/src/routes/lists/listroute.js")

let server = express()

server.use(cors())

server.use(express.json())

server.use(express.urlencoded())

server.use(express.static("src"))

server.use("/",login_route)

server.use("/",products_route)

server.use("/",list_route)

server.listen(5500,()=>{
  console.log("connected");
})