const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const productsAdminRouter = require("./routes/admin/products");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); //this applies to all parts of our app

app.use(
  cookieSession({
    keys: ["lfddfksfksfsfkdfdfksfjgifgijgfsjf"],
  })
);

app.use(authRouter);
app.use(productsRouter);
app.use(productsAdminRouter);
app.use(cartsRouter);

app.listen(3000, () => {
  console.log("listening");
});
