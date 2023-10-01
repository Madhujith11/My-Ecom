import {back_to_field} from "/public/login/login.js"

let pass1 = document.querySelector(".pass1 input")

let pass2 = document.querySelector(".pass2 input")

let submit = document.querySelector("button")

let verify = JSON.parse(localStorage.getItem("verify"))

let err = document.querySelector(".error")

let inputs = document.querySelectorAll("input")

back_to_field(inputs,err)

submit.addEventListener("click",()=>{
  if ((pass1.value == pass2.value) && (pass1.value.length > 0)) {
    fetch("/newpass",{
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        email : verify.email,
        pass : pass1.value
      })
    })
    .then((data)=>{
      return data.json()
    })
    .then((data)=>{
      location.href = data.newpage
    })
  }
  else {
    err.classList.remove("hide")
  }
})