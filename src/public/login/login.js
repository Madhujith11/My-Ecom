export function login(url) {
  let email = document.querySelector(".email input");

  let pass = document.querySelector(".password input");

  let err = document.querySelector(".error");

  let submit = document.querySelector("button");

  submit.addEventListener("click", () => {
    let data;

    if (url == "/signup") {
      data = {
        email: email.value,
        pass: pass.value,
        cart: [],
        wish: [],
        product: [],
        orders: [],
        history: [],
      };
    } else if (url == "/signin") {
      data = {
        email: email.value,
        pass: pass.value,
      };
    } else {
      data = {
        email: email.value,
      };
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.value) {
          if (data.id) {
            localStorage.setItem("userid", JSON.stringify(data.id));
          }
          if (data.verify) {
            console.log(data.verify);
            localStorage.setItem("verify", JSON.stringify(data.verify));
          }
          location.href = data.nextpage;
        } else {
          err.classList.remove("hide");
        }
      });
  });
}

export function back_to_field(inputs, err) {
  inputs.forEach((input) => {
    input.addEventListener("click", () => {
      err.classList.add("hide");
    });
  });
}


export function show_password (icon) {
  icon.addEventListener("click",()=>{
    let password = document.querySelector(".password input")
    let type = password.getAttribute("type")
    if (type == "password") {
      password.setAttribute("type","text")
    }
    else {
      password.setAttribute("type","password")
    }
  })
}