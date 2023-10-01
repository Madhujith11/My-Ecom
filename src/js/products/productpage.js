import {
  header_render,
  show_sidebar,
  product_render,
  products_render,
  select_product,
  addlist,
  review_render,
  outerclick
} from "/public/products/products.js";

header_render();

show_sidebar();

let productblock = document.querySelector("main .product");

let product_arr = JSON.parse(localStorage.getItem("product"));

product_render(productblock, product_arr);

let plus = document.querySelector("main .fa-plus");

let minus = document.querySelector("main .fa-minus");

plus.addEventListener("click", () => {
  let num = Number(document.querySelector("main #num").innerHTML);
  num = num + 1;
  document.querySelector("main #num").innerHTML = num;
  product_arr[0].quantity = num;
  localStorage.setItem("product", JSON.stringify(product_arr));
});

minus.addEventListener("click", () => {
  let num = Number(document.querySelector("main #num").innerHTML);
  if (num > 1) {
    num = num - 1;
    document.querySelector("main #num").innerHTML = num;
    product_arr[0].quantity = num;
    localStorage.setItem("product", JSON.stringify(product_arr));
  }
});

let wishbutton = document.querySelector(".imgblock i");

let userid = JSON.parse(localStorage.getItem("userid"));

addlist(wishbutton, userid, product_arr, "wish");

let cartbutton = document.querySelector(".cart");

addlist(cartbutton, userid, product_arr, "cart");

let orderbutton = document.querySelector(".order");

addlist(orderbutton, userid, product_arr, "orders");

let recommended_arr = JSON.parse(localStorage.getItem("products"));

products_render(recommended_arr);

let products_arr = JSON.parse(localStorage.getItem("products"));

select_product(products_arr);

fetch("/reviews", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    product: product_arr[0],
  }),
})
  .then((data) => {
    return data.json();
  })

  .then((data) => {
    let reviews_arr = data;
    let reviewblock = document.querySelector(".reviews")
    review_render(reviewblock,reviews_arr)
  })


let submit = document.querySelector(".writeblock button")

let ratting = document.querySelector("#ratting")

let text = document.querySelector("textarea")

submit.addEventListener("click",()=>{

  let data = {
    user_id : userid,
    product : product_arr[0],
    ratting : ratting.value,
    text : text.value
  }

  fetch("/addreview",{
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)

  })

  location.reload()

})

outerclick()