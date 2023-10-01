let model = require("M:/ecom/src/data/lists/model.js");

let users = model.users;

let products = model.products;

exports.category = (req, res) => {
  let value = req.body.value;

  products.find({$or : [ {category : { $regex : value }},{description : { $regex : value }},{name : { $regex : value }} ]}).then((data) => {
    res.json(data);
  });
};


exports.reviews = (req,res)=>{

  let product = req.body.product

  products.findOne({_id : product._id})
  .then((product)=>{
    let arr = product.reviews
    res.json(arr)
  })

}


exports.addreview = (req,res) => {

  let user_id = req.body.user_id

  let product = req.body.product

  users.findOne({_id : user_id})

  .then ((user)=>{

    let filtered = user.orders.filter((obj)=>{

      return obj._id == product._id

    })

    if (filtered.length != 0) {

      let review = {
        name : user.email,
        text : req.body.text,
        ratting : req.body.ratting
      }
    
      products.findOne({_id : product._id})
    
      .then((product)=>{

        return products.updateOne(product,{$push : {reviews : review}})

      })

    }

    else {

      console.log("You haven't bought the product ")

    }
    
  })

}


exports.autofill = (req,res) => {

  let value = req.body.value

  products.find({$or : [ {category : { $regex : value }},{description : { $regex : value }},{name : { $regex : value }} ]}).limit(5)
  
  .then((data) => {
    res.json(data);
  });

}