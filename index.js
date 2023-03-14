const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //this applies to all parts of our app

app.use(
  cookieSession({
    keys: ["lfddfksfksfsfkdfdfksfjgifgijgfsjf"],
  })
);

app.use(authRouter);

app.listen(3000, () => {
  console.log("listening");
});
