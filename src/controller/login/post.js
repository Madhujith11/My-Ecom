let transport = require("M:/ecom/src/data/login/mailer.js");

let users = require("M:/ecom/src/data/login/model.js");

let email_validator = require("email-validator");

exports.signup = (req, res) => {
  let email = email_validator.validate(req.body.email);
  let pass = String(req.body.pass)
  if ((email) && (pass.length > 0)) {
    let data = new users(req.body);
    data.save();
    res.json({
      value: true,
      nextpage: "/signin",
    });
  } else {
    res.json({
      value: false,
    });
  }
};

exports.signin = (req, res) => {
  let data = req.body;
  let db = users.findOne({ email: data.email }).then((result) => {
    if (result) {
      if (result.pass == data.pass) {
        res.json({
          value: true,
          id: result._id,
          nextpage: "/category",
        });
      }
      else {
        res.json({
          value: false,
        });
      }
    } else {
      res.json({
        value: false,
      });
    }
  });
};

exports.forget = (req, res) => {
  let data = req.body;
  let email = email_validator.validate(data.email);
  if (email) {
    let option = {
      from: "devmadhujith@gmail.com",
      to: data.email,
      subject: "otp for login",
      text: String(Math.floor(Math.random() * 10000)),
    };
    transport.sendMail(option, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({
      value : true,
      verify: {
        email: option.to,
        otp: option.text,
      },
      nextpage: "/otp",
    });
  } else {
    res.json({
      value: false,
    });
  }
};
