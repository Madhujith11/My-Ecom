let express = require("express")

let img = require("M:/ecom/src/controller/lists/post.js")


let router = express.Router()


let getr  = require("M:/ecom/src/controller/lists/get.js")


let postr  = require("M:/ecom/src/controller/lists/post.js")


let updater  = require("M:/ecom/src/controller/lists/update.js")



router.get("/wish",getr.wish)

router.get("/cart",getr.cart)

router.get("/orders",getr.orders)

router.get("/newproduct",getr.newproduct)



router.post("/list",postr.list)

router.post("/newproduct",img.upload.single("image"),postr.newproduct)


router.put("/deletelist",updater.deletelist)

router.put("/clearcart",updater.clearcart);

router.put("/buycart",updater.buycart)

router.put("/totalprice",updater.totalprice)


module.exports = router;