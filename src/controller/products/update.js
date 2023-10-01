let model = require("M:/ecom/src/data/lists/model.js");

let users = model.users;

let products = model.products;

exports.addlist = (req, res) => {
  let product = req.body.product;

  let user_id = req.body.user_id;

  let arr = req.body.arr;

  if (arr == "cart") {
    users
      .findOne({ _id: user_id })

      .then((user) => {
        let arr = user.cart.filter((obj) => {
          return obj._id == product._id;
        });
        if (arr.length == 0) {
          return users.updateOne(user, { $push: { cart: product } });
        } else {
          console.log("Already exists");
        }
      });
  } else if (arr == "wish") {
    users
      .findOne({ _id: user_id })

      .then((user) => {
        let arr = user.wish.filter((obj) => {
          return obj._id == product._id;
        });

        if (arr.length == 0) {
          return users.updateOne(user, { $push: { wish: product } });
        } else {
          console.log("Already exists");
        }
      });
  } else {
    users
      .findOne({ _id: user_id })

      .then((user) => {
        let arr = user.orders.filter((obj) => {
          return obj._id == product._id;
        });

        if (arr.length == 0) {
          return users.updateOne(user, { $push: { orders: product } });
        } else {
          console.log("Already exists");
        }
      });
  }
};
