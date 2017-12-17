//REQUIRE USERS AND SWAG FROM MODELS:This is where the users are kept after registering.
const swag = require("../models/swag");
const users = require("../models/users");
let id = 1;

//EXPORT AN OBJECT FOR REGISTER, GET-USERS, LOGIN, & SIGNOUT:
module.exports = {
  //REGISTER:This method should look for a username and password on the request body and then create a user object.
  register: (req, res, next) => {
    const { session } = req;
    const { username, password } = req.body;

    users.push({ id, username, password }); //add user with id, username, & pw and plus 1 to the id so that each user has a distingtive id.
    id++; //After pushing the new user object to the users array it should increment the value of id by one.

    session.user.username = username;
    res.status(200).send(session.user);
  },

  //GET-USER: This method is responsible for reading the user object off of session and return it with a status of 200.
  getUser: (req, res, next) => {
    const { session } = req;
    res.status(200).send(session.user);
  },

  //LOGIN:
  login: (req, res, next) => {
    const { session } = req;
    const { username, password } = req.body; //should use username & pw from the request body to find a user object

    //If it finds a user with that combination, it should update the value of username on the request session's user object
    const user = users.find(
      user => user.username === username && user.password === password
    );
    if (user) {
      //send a status of 200 with the updated user object. If it doesn't find a user it should send a status of 500.
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.status(500).send("Unauthorized.");
    }
  },

  //SIGNOUT:This method is responsible for destroying the session & returning the session ( which should be undefined at that point )
  signout: (req, res, next) => {
    const { session } = req;
    session.destroy();
    res.status(200).send(req.session);
  }
};
