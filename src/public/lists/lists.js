export function deleting(button, userid, arr) {
  let product_id = button.parentElement.getAttribute("id");

  fetch("/deletelist", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userid,
      product_id: product_id,
      arr: arr,
    })
  });

  location.reload();
}

export function list(arr, products_render, select_product, deleting) {

  let productsblock = document.querySelector("main .products");

  let userid = JSON.parse(localStorage.getItem("userid"));

  fetch(`/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userid,
      arr: arr,
    }),
  })
    .then((data) => {
      return data.json();
    })

    .then((data) => {
      let products_arr = data;
      localStorage.setItem("products", JSON.stringify(products_arr));
      products_render(products_arr);
    })

    .then(() => {
      let products_arr = JSON.parse(localStorage.getItem("products"));
      select_product(products_arr);

      let deletebutton = document.querySelectorAll("div .fa-trash");
      deletebutton.forEach((button) => {
        button.addEventListener("click", () => {
          deleting(button, userid, arr);
        });
      });
    });
}
