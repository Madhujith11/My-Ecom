import {
  filter_render,
  header_render,
  show_sidebar,
  under_category_arr,
} from "/public/products/products.js";

header_render();

show_sidebar();

let filterblock = document.querySelector("main .filter");

filter_render(filterblock);

let active_id = JSON.parse(localStorage.getItem("active_filter"))

if (active_id != "") {

document.getElementById(active_id).setAttribute("checked","true")

}

let products_arr = JSON.parse(localStorage.getItem("products"));

function products_count (products_arr) {
  let length = products_arr.length
  document.querySelector("button span").innerHTML = `${length}`
}

products_count(products_arr)

let applybutton = document.querySelector(".apply");

applybutton.addEventListener("click", () => {

  let price1 = document.getElementById("price(ltoh)");

  let price2 = document.getElementById("price(htol)");

  let rattings1 = document.getElementById("rattings(ltoh)");

  let rattings2 = document.getElementById("rattings(htol)");

  let offers1 = document.getElementById("offers30%");

  let offers2 = document.getElementById("offers50%");

  let poularity1 = document.getElementById("poularity(ltoh)");

  let poularity2 = document.getElementById("poularity(htol)");

  let stock1 = document.getElementById("stock(in)");

  let stock2 = document.getElementById("stock(out)");

  let payment1 = document.getElementById("payment(cod)");

  let payment2 = document.getElementById("payment(upi)");

  if (price1.checked) {
    products_arr = products_arr.sort((a, b) => {
      return a.price - b.price;
    });
    localStorage.setItem("active_filter",JSON.stringify("price(ltoh)"))
  } else if (price2.checked) {
    products_arr = products_arr.sort((a, b) => {
      return b.price - a.price;
    });
    localStorage.setItem("active_filter",JSON.stringify("price(htol)"))
  } else if (rattings1.checked) {
    products_arr = products_arr.sort((a, b) => {
      return a.rattings - b.rattings;
    });
    localStorage.setItem("active_filter",JSON.stringify("rattings(ltoh)"))
  } else if (rattings2.checked) {
    products_arr = products_arr.sort((a, b) => {
      return b.rattings - a.rattings;
    });
    localStorage.setItem("active_filter",JSON.stringify("rattings(htol)"))
  } else if (offers1.checked) {
    products_arr = products_arr.filter((obj) => {
      return Math.floor(((obj.mrp - obj.price) / obj.mrp) * 100) >= 30
    });
    localStorage.setItem("active_filter",JSON.stringify("offers30%"))
  } else if (offers2.checked) {
    products_arr = products_arr.filter((obj) => {
      return Math.floor(((obj.mrp - obj.price) / obj.mrp) * 100) >= 50
    });
    localStorage.setItem("active_filter",JSON.stringify("offers50%"))
  } else if (poularity1.checked) {
    products_arr = products_arr.sort((a, b) => {
      return a.reviews.length - b.reviews.length;
    });
    localStorage.setItem("active_filter",JSON.stringify("poularity(ltoh)"))
  } else if (poularity2.checked) {
    products_arr = products_arr.sort((a, b) => {
      return b.reviews.length - a.reviews.length;
    });
    localStorage.setItem("active_filter",JSON.stringify("poularity(htol)"))
  } else if (stock1.checked) {
    products_arr = products_arr.filter((obj) => {
      return obj.stock == "In Stock";
    });
    localStorage.setItem("active_filter",JSON.stringify("stock(in)"))
  } else if (stock2.checked) {
    products_arr = products_arr.filter((obj) => {
      return obj.stock == "Out of Stock";
    });
    localStorage.setItem("active_filter",JSON.stringify("stock(out)"))
  } else if (payment1.checked) {
    products_arr = products_arr.filter((obj) => {
      return obj.payment.includes("COD");
    });
    localStorage.setItem("active_filter",JSON.stringify("payment(cod)"))
  } else if (payment2.checked) {
    products_arr = products_arr.filter((obj) => {
      return obj.payment.includes("UPI");
    });
    localStorage.setItem("active_filter",JSON.stringify("payment(upi)"))
  } else {
    console.log("error");
  }

  products_count(products_arr)

  localStorage.setItem("products",JSON.stringify(products_arr))
});

function reset () {

  localStorage.setItem("active_filter",JSON.stringify(""))

  let category = JSON.parse(localStorage.getItem("category")).toLowerCase()

  under_category_arr(category)

  location.reload()

}

let clearbutton = document.querySelector(".clear");

clearbutton.addEventListener("click",reset)