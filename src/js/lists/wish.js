import {
  header_render,
  show_sidebar,
  products_render,
  select_product
} from "/public/products/products.js";

import {deleting,list} from "/public/lists/lists.js"

let header = document.querySelector("header");

header_render(header);

let bar = document.querySelector("footer .fa-bars");

let sidebar = document.querySelector("header nav");

let main = document.querySelector("main")

show_sidebar(bar, sidebar,main);

list("wish",products_render,select_product,deleting)