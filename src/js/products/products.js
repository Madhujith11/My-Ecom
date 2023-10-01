import {
  header_render,
  show_sidebar,
  products_render,
  select_product,
  search,
  outerclick
} from "/public/products/products.js";

header_render();

show_sidebar();

let search_value = JSON.parse(localStorage.getItem("search"))

let searchbox = document.querySelector("footer input")

if (search_value) {
  searchbox.value = search_value
}

let products_arr = JSON.parse(localStorage.getItem("products"));

products_render(products_arr);

select_product(products_arr)

search()

outerclick()