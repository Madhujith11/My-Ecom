import {back_to_field} from "/public/login/login.js"

let otp = document.querySelector("input")

let submit = document.querySelector("button")

let verify = JSON.parse(localStorage.getItem("verify"))

let err = document.querySelector(".error")

let inputs = document.querySelectorAll("input")

back_to_field(inputs,err)

submit.addEventListener("click",()=>{
  if (verify.otp == otp.value) {
      location.href = "/newpass"
  }
  else {
    err.classList.remove("hide")
  }
})
