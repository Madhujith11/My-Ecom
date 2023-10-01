export function header_render() {
  let header = document.querySelector("header");

  return (header.innerHTML = `

  <nav>

  <a href="">Home</a>
  <a href="/category">Category</a>
  <a href="/wish">Wishlist</a>
  <a href="/cart">Cart</a>
  <a href="">Profile</a>
  <a href="/orders">Orders</a>
  <a href="/newproduct">Products</a>
  <a href="">History</a>
  <a href="">Logout</a>

  </nav>
  
  `);
}

export function show_sidebar() {
  let bar = document.querySelector("footer .fa-bars");
  let sidebar = document.querySelector("header");

  bar.addEventListener("click", () => {
    sidebar.classList.toggle("hide");
  });
}

let category_arr = [
  {
    img: "/public/images/category/football.webp",
    category: "Footballs",
  },
  {
    img: "/public/images/category/boot.jpg",
    category: "Boots",
  },
  {
    img: "/public/images/category/jersey.jpg",
    category: "Jerseys",
  },
];

export function under_category_arr(category) {
  fetch("/category", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      value: category,
    }),
  })
    .then((data) => {
      return data.json();
    })

    .then((data) => {
      localStorage.setItem("products", JSON.stringify(data));
    });
}

export function category_render() {
  let category = document.querySelector("main section");

  return (category.innerHTML = category_arr
    .map((obj) => {
      return `

    <div class = "${obj.category} categoryblock">

    <img src="${obj.img}" alt="">
    <h3>${obj.category}</h3>

    </div>
    `;
    })
    .join(""));
}

let searchbox = document.querySelector("footer input");
let searchbutton = document.querySelector("footer div i");
let autofillblock = document.querySelector(".autofill");

export function outerclick() {
  let sidebar = document.querySelector("header");
  let main = document.querySelector("main");
  main.addEventListener("click", () => {
    autofillblock.classList.add("hide");
    sidebar.classList.add("hide");
  });
}

export function search() {
  searchbox.addEventListener("keyup", () => {
    if (searchbox.value != "") {
      autofill(searchbox.value);
      autofillblock.classList.remove("hide");
    } else {
      autofillblock.classList.add("hide");
    }
  });

  searchbutton.addEventListener("click", () => {
    let input = String(searchbox.value).toLowerCase();
    localStorage.setItem("category", JSON.stringify(input));
    localStorage.setItem("search", JSON.stringify(searchbox.value));
    under_category_arr(input);
    location.href = "/products";
  });
}

export function autofill(value) {
  fetch("/autofill", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      value: value,
    }),
  })
    .then((data) => {
      return data.json();
    })

    .then((data) => {
      let autofillblock = document.querySelector(".autofill");
      recommend(value,data);
      let names = document.querySelectorAll(".autofill p");
      names.forEach((name) => {
        name.addEventListener("click", () => {
          searchbox.value = name.innerHTML;
          autofillblock.classList.add("hide");
        });
      });
    });
}

export function recommend(value,data) {
  let exists = data.some((obj)=>{
    return obj.name.includes(value)
  })
  if (exists) {
  return (autofillblock.innerHTML = data
    .map((obj) => {
      return `
    <p>${String(obj.name).toUpperCase()}</p>
    `;
    })
    .join(""));
  }
  else {
    return(
    autofillblock.innerHTML = `<p>${String(data[0].category).toUpperCase()}</p>`
    )
  }
}

export function products_render(array) {
  let productsblock = document.querySelector("main .products");

  return (productsblock.innerHTML = array
    .map((obj) => {
      return `

    <div id = "${obj._id}" class="productblock">

    <i class="fa-solid fa-trash"></i>
    <img src="${obj.img}" alt="">
    <div>
    <h3>${String(obj.name).toUpperCase()}</h3>
    <p>${obj.rattings}<i class="fa-regular fa-star"></i>(${
      obj.reviews.length
    })</p>
    </div>
    <div class="mrp">
    <p>${obj.mrp * obj.quantity} rs</p> 
    <p class="discount">(-${Math.floor(
      ((obj.mrp - obj.price) / obj.mrp) * 100
    )} %)</p> 
    </div>
    <h3>${obj.price * obj.quantity} rs</h3>
    </div>
    `;
    })
    .join(""));
}

export function select_product(products_arr) {
  let imgs = document.querySelectorAll(".products img");

  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      let id = img.parentElement.getAttribute("id");

      let product = products_arr.filter((obj) => {
        return obj._id == id;
      });

      localStorage.setItem("product", JSON.stringify(product));

      location.href = "/product";
    });
  });
}

export function product_render(block, array) {
  return (block.innerHTML = array
    .map((obj) => {
      return `
      <div class="imgblock">
      <img src="${obj.img}" alt="">
      <i class="fa-solid fa-heart"></i>
      </div>
      <div class="productdetail">
      <h1>${obj.name}</h1>
      <div class="mrp">
      <h3>${obj.mrp * obj.quantity} rs</h3> 
      <h3 class="discount">(${Math.floor(
      ((obj.mrp - obj.price) / obj.mrp) * 100
      )} %)</h3> 
      </div>
      <h2>${obj.price * obj.quantity} rs</h2>
      <p>${obj.rattings} <i class="fa-regular fa-star"></i> (${
        obj.reviews.length
      })</p>
      <div class="count">
      <i class="fa-solid fa-plus"></i>
      <p id="num">${obj.quantity}</p>
      <i class="fa-solid fa-minus"></i>
      </div>
      <p>Size : ${obj.size}</p>
      <p>${obj.stock}</p>
      <div class="cartbuy">
      <button class = "cart">Cart <i class="fa-solid fa-cart-shopping"></i></button>
      <button class = "order">Buy <i class="fa-solid fa-credit-card"></i></button>
      </div>
      </div>
      `;
    })
    .join(""));
}


let filter_arr = [
  {
    h : "Price",
    id1 : "price(ltoh)",
    h1 : "Low to High",
    id2 : "price(htol)",
    h2 : "High to Low"
  },
  {
    h : "Rattings",
    id1 : "rattings(ltoh)",
    h1 : "Low to High",
    id2 : "rattings(htol)",
    h2 : "High to Low"
  },
  {
    h : "Offers",
    id1 : "offers30%",
    h1 : "Above 30%",
    id2 : "offers50%",
    h2 : "Above 50%"
  },
  {
    h : "Popularity",
    id1 : "poularity(ltoh)",
    h1 : "Low to High",
    id2 : "poularity(htol)",
    h2 : "High to Low"
  },
  {
    h : "Stock",
    id1 : "stock(in)",
    h1 : "In Stock",
    id2 : "stock(out)",
    h2 : "Out Of Stock"
  },
  {
    h : "Payment",
    id1 : "payment(cod)",
    h1 : "COD",
    id2 : "payment(upi)",
    h2 : "UPI"
  }
]

export function filter_render(block) {
  return (block.innerHTML = filter_arr.map((obj)=>{
    return (`

    <div class="filterblock">
      <h3>${obj.h}</h3>
      <div>
      <input id = "${obj.id1}" type="radio" name = "filter">
      <p>${obj.h1}</p>
      </div>
      <div>
      <input id = "${obj.id2}" type="radio" name = "filter">
      <p>${obj.h2}</p>
      </div>
    </div>
  `)
  }).join(""))
}

export function addlist(button, userid, product_arr, arr) {
  button.addEventListener("click", () => {
    let data = {
      user_id: userid,
      product: product_arr[0],
      arr: arr,
    };

    fetch("/addlist", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  });
}

export function review_render(block, array) {
  return (block.innerHTML = array
    .map((obj) => {
      return `
      <div>
        <h3>${obj.name} (${obj.ratting} <i class="fa-regular fa-star"></i>)</h3>
        <p>${obj.text}</p>
      </div>
      `;
    })
    .join(""));
}
