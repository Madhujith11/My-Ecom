let model = require("M:/ecom/src/data/lists/model.js");


let mongoose = require("mongoose")


let multer = require("multer")


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/ecom/src/imgs")
  },
  filename: function (req, file, cb) {
    cb(null,`${file.originalname}`)
  }
})

exports.upload = multer({ storage: storage })


let users = model.users;


let products = model.products;


exports.list = (req,res)=>{
  
  let user_id = req.body.user_id

  let arr = req.body.arr

  if (arr == "cart") {

    users.findOne({_id : user_id})

    .then((user)=>{
  
      let arr = user.cart
  
      res.json(arr)
  
    })

  }

  else if (arr == "wish") {

    users.findOne({_id : user_id})

    .then((user)=>{
  
      let arr = user.wish
  
      res.json(arr)
  
    })

  }

  else if (arr == "orders") {

    users.findOne({_id : user_id})

    .then((user)=>{
  
      let arr = user.orders
  
      res.json(arr)
  
    })

  }

  else {

    users.findOne({_id : user_id})

    .then((user)=>{
  
      let arr = user.products
  
      res.json(arr)
  
    })

  }

}


exports.newproduct = (req, res) => {

  let data = JSON.parse(req.body.data);

  let user_id = data.user_id

  let product = data.product

  product._id = new mongoose.mongo.ObjectId()

  product.img = "/imgs/"+req.file.filename;

  users.findOne({ _id: user_id })
  
  .then((user) => {

    return users.updateOne(user, { $push: { products: product } })

  });

  let newproduct = new products(product);

  newproduct.save()

};