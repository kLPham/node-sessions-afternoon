module.exports = function(req, res, next) {
  const { session } = req;

  //CHECK TO SEE IF THE USER EXIST ON SESSION:
  if (!session.user) {
    //if the user is not in session.If it doesn't exist, we'll want to add a user object to the session
    session.user = { username: "", cart: [], total: 0 }; //user object should default to this.
  }
  next(); //we'll call next after if statement so that the request can reach the endpoint.
};
