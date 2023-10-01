import {
  header_render,
  show_sidebar,
  products_render,
  select_product
} from "/public/products/products.js";

import { deleting, list } from "/public/lists/lists.js";

let header = document.querySelector("header");

header_render(header);

let bar = document.querySelector("footer .fa-bars");

let sidebar = document.querySelector("header nav");

let main = document.querySelector("main")

show_sidebar(bar, sidebar,main);

list("cart", products_render, select_product, deleting);

let userid = JSON.parse(localStorage.getItem("userid"));

fetch("/totalprice", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user_id: userid,
  }),
})
  .then((data) => {
    return data.json();
  })

  .then((data) => {
    console.log(data);
    let total = data.total;
    document.querySelector("span").innerHTML = total;
  });

let clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
  fetch("/clearcart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userid,
    }),
  });

  location.reload();
});

let buy = document.querySelector(".buy");

buy.addEventListener("click", () => {
  fetch("/buycart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userid,
    }),
  });
});