exports.category = (req,res)=>{

  res.redirect("/views/products/category.html")

}

exports.products = (req,res)=>{

  res.redirect("/views/products/products.html")

}

exports.product = (req,res)=>{

  res.redirect("/views/products/productpage.html")

}

exports.filter = (req,res)=>{

  res.redirect("/views/products/filterpage.html")
  
}