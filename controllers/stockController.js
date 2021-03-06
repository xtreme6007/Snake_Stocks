const Stock = require("../models/stocks.js");


// Defining methods for the Stocks Controller

module.exports = {
  findAll: function(req, res) {
    Stock
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByStock: function(req, res) {
    Stock
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    
      Stock
      .create({stock: req.body})
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
        

      });
  },
  update: function(req, res) {
    Stock
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
};
