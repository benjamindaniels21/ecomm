const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");
const cookieSession = require("cookie-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //this applies to all parts of our app

app.use(
  cookieSession({
    keys: ["lfddfksfksfsfkdfdfksfjgifgijgfsjf"],
  })
);

app.listen(3000, () => {
  console.log("listening");
});
