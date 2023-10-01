import {login,back_to_field,show_password} from "/public/login/login.js"

let url = "/signin"

login(url)

let err = document.querySelector(".error")

let inputs = document.querySelectorAll("input")

back_to_field(inputs,err)

let show_icon = document.querySelector(".password i")

show_password(show_icon)