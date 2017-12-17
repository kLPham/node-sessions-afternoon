const swag = require("../models/swag");

module.exports = {
  add: (req, res, next) => {
    //Should use the id to see if it is already in the user's cart on session.
    const { id } = req.query; //Should check the request query for id.
    let { cart } = req.session.user;

    const index = cart.findIndex(swag => swag.id == id); //this will return -1 if it's not in the cart.

    if (index === -1) {
      //if not in cart
      const selectedSwag = swag.find(swag => swag.id == id); //find swag id.
      cart.push(selectedSwag); //add items to cart.
      req.session.user.total += selectedSwag.price; //cart.total + price.
    }
  },

  delete: (req, res, next) => {
    //Should use the id to remove the swag from cart and subtract it's price from the total.
    const { id } = req.query; //Should check the request query for id.
    let { cart } = req.session.user;
    const selectedSwag = swag.find(swag => swag.id == id);
    if (selectedSwag) {
      //if the swag was in the cart.
      const k = cart.findIndex(swag => swag.id == id);
      cart.splice(k, 1);
      req.session.user.total -= selectedSwag.price; // remove the swag from the cart and subtract the price from the total
    }
    res.status(200).send(req.session.user); //The method should then return a status of 200 with the request session user's object.
  },

  checkout: (req, res, next) => {
    //Should set the cart back to an empty array on session.
    const { user } = req.session;
    user.cart = [];
    user.total = 0; //Should set the total back to 0 on session.
    res.status(200).send(req.session.user); // send a status of 200 with the update request session' user object
  }
};
