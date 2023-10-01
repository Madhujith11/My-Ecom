import {
  header_render,
  show_sidebar,
  category_render,
  under_category_arr,
  search,
  outerclick
} from "/public/products/products.js";

header_render();

show_sidebar();

category_render();

localStorage.setItem("search",JSON.stringify(""));

let divs = document.querySelectorAll("main .categoryblock");

divs.forEach((div) => {
  div.addEventListener("click", () => {

    let category = div.classList[0].toLowerCase()

    localStorage.setItem("category",JSON.stringify(category))

    localStorage.setItem("active_filter",JSON.stringify(""))

    under_category_arr(category)

    location.href = "/products"
  });
});

search()

outerclick()