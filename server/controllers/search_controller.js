const swag = require("../models/swag");

module.exports = {
  search: (req, res, next) => {
    const { category } = req.query; //look at the request query for a category.
    if (!category) {
      //If it can't find a category.
      res.status(200).send(swag); //it should return a status of 200 with the entire swag array
    } else {
      // If it can, it should filter the swag array by the category and return the filtered swag array.
      const filteredSwag = swag.filter(swag => swag.category === category);
      res.status(200).send(filteredSwag);
    }
  }
};
