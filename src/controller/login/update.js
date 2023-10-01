let users = require("M:/ecom/src/data/login/model.js")

exports.newpass = (req,res)=>{
  let data = req.body
  users.findOne({email:data.email})
  .then((result)=>{
    return users.updateOne(result,{$set : {email : result.email, pass : data.pass}})
  })
  .then(()=>{
    res.json({
      newpage : "/signin"
    })
  })
}