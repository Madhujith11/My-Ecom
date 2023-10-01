let express = require("express")


let router = express.Router()


let getr  = require("M:/ecom/src/controller/products/get.js")


let postr  = require("M:/ecom/src/controller/products/post.js")


let updater  = require("M:/ecom/src/controller/products/update.js")



router.get("/category",getr.category)

router.get("/products",getr.products)

router.get("/product",getr.product)

router.get("/filter",getr.filter)



router.post("/category",postr.category)

router.post("/reviews",postr.reviews)

router.post("/addreview",postr.addreview)

router.post("/autofill",postr.autofill)

router.put("/addlist",updater.addlist)


module.exports = router