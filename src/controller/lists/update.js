let model = require("M:/ecom/src/data/lists/model.js");

let users = model.users;

let products = model.products

exports.deletelist = (req,res)=>{
  
  let user_id = req.body.user_id

  let product_id = req.body.product_id

  let arr = req.body.arr
  
  if (arr == "cart") {

  users.findOne({_id : user_id})

    .then((user)=>{

      return users.updateOne(user,{$pull : {cart : {_id : product_id}}})

  })

  }

  else if (arr == "wish") {

  users.findOne({_id : user_id})

    .then((user)=>{

      return users.updateOne(user,{$pull : {wish : {_id : product_id}}})

  })

  }

  else if (arr == "orders") {

  users.findOne({_id : user_id})

  .then((user)=>{

    return users.updateOne(user,{$pull : {orders : {_id : product_id}}})

  })

  }

  else {

  users.findOne({_id : user_id})

  .then((user)=>{
    let products = user.products.filter((obj)=>{
      return obj._id != product_id
    })
    return users.updateOne(user,{$set : {products : products}})
  })

  .then(()=>{
    return products.deleteOne({_id : product_id})
  })

  }

}


exports.clearcart = (req, res) => {

  let user_id = req.body.user_id

  users.findOne({_id : user_id})

  .then((user)=>{

    return users.updateOne(user,{$set : {cart : []}})

  })

};


exports.buycart = (req, res) => {

  let user_id = req.body.user_id

  users.findOne({_id : user_id})

  .then((user)=>{

    let cart = user.cart

    return users.updateOne(user,{$set : {orders : cart}})

  })

};


exports.totalprice = (req,res)=>{

  let user_id = req.body.user_id

  users.findOne({_id : user_id})

  .then((user)=>{

    let cart = user.cart

    let total = cart.reduce((start,next)=>{

      console.log(next.price);

      return (start.price * start.quantity) + (next.price * next.quantity)

    })

    res.json({

      total : total

    })

  })

}