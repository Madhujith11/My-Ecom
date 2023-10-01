import {
  header_render,
  show_sidebar,
  products_render,
  select_product,
  outerclick
} from "/public/products/products.js";

import {deleting,list} from "/public/lists/lists.js"

header_render();

show_sidebar();

let userid = JSON.parse(localStorage.getItem("userid"));

let submit = document.querySelector("button")

let file = document.getElementById("imgfile")

file.addEventListener("change",()=>{

  let src = URL.createObjectURL(file.files[0])

  let img = document.querySelector(".createblock img")

  img.setAttribute("src",src)

})

submit.addEventListener("click",()=>{

  let formdata = new FormData();

  let img = document.getElementById("imgfile");

  formdata.append("image",img.files[0])

  let name = String(document.getElementById("name").value)

  let category = String(document.getElementById("category").value)

  let price = Number(document.getElementById("price").value)

  let mrp = Number(document.getElementById("mrp").value)

  let quantity = Number(document.getElementById("quantity").value)

  let size = String(document.getElementById("size").value)

  let description = String(document.getElementById("description").value)

  let data = {
    user_id : userid,
    product : {
    _id : "",
    img : "",
    name : name.toLowerCase(),
    category : category,
    description : description,
    mrp : mrp,
    price : price,
    rattings : 0,
    reviews : [],
    stock : "In Stock",
    quantity : quantity,
    size : size
    }
  }

  formdata.append("data",JSON.stringify(data));

  fetch("/newproduct",{
    method : "POST",
    body : formdata
  })

  location.reload();

})

list("myproducts",products_render,select_product,deleting)

outerclick()