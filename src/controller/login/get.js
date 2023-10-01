exports.signup = (req,res)=>{
  res.redirect("/views/login/signup.html")
}

exports.signin = (req,res)=>{
  res.redirect("/views/login/signin.html")
}

exports.forget = (req,res)=>{
  res.redirect("/views/login/forget.html")
}

exports.otp = (req,res)=>{
  res.redirect("/views/login/otp.html")
}

exports.newpass = (req,res)=>{
  res.redirect("/views/login/newpass.html")
}