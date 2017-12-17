const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

//REQUIRE MIDDLEWARE & ADD IT TO APP:
const checkForSession = require("./middlewares/checkForSession");

//REQUIRE THE CONTROLLERS:
const swag_controller = require("./controllers/swag_controller");
const auth_controller = require("./controllers/auth_controller");
const cart_controller = require("./controllers/cart_controller");
const search_controller = require("./controllers/search_controller");

const app = express();
const port = 3000;

//add middleware to the app so we can read json from the request body & add session ui
app.use(bodyParser.json());
app.use(
  session({
    secret: "Wylie123", //process.env.SESSION_SECRET
    resave: false,
    saveUninitialized: false
  })
);

//USE APP.USE TO ADD CHECKFORSESSION:
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`)); //Add middleware to use express.static to serve up the build folder in /build.

//**ENDPOINT BELOW:**

//GET SWAG ENDPOINT:
app.get("/api/swag", swag_controller.read); //Let's make a GET endpoint at /api/swagthat calls the read method on our swag_controller

//AUTH ENDPOINTS:CREATE THE ENDPOINTS: GET, PUT & POST.
app.post("/api/register", auth_controller.register);
app.get("/api/user", auth_controller.getUser);
app.post("/api/login", auth_controller.login);
app.post("/api/signout", auth_controller.signout);

//CART ENDPOINTS:CREATE POST & DELETE ENDPOINTS for add, delete & checkout:
app.post("api/cart", cart_controller.add);
app.delete("/api/cart", cart_controller.delete);
app.post("/api/cart/checkout", cart_controller.checkout);

//SEARCH: Create a GET endpoint on /api/search that calls the search method on the search controller.
app.get("/api/search", search_controller.search);

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
