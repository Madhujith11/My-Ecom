let express = require("express")


let router = express.Router()


let getr  = require("M:/ecom/src/controller/login/get.js")


let postr  = require("M:/ecom/src/controller/login/post.js")


let updater  = require("M:/ecom/src/controller/login/update.js")


router.get("/signup",getr.signup)

router.get("/signin",getr.signin)

router.get("/forget",getr.forget)

router.get("/otp",getr.otp)

router.get("/newpass",getr.newpass)


router.post("/signup",postr.signup)

router.post("/signin",postr.signin)

router.post("/forget",postr.forget)


router.put("/newpass",updater.newpass)

module.exports = router