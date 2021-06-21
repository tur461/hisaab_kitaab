const Drug = require("../models/drug.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a drug
    const drug = Drug.getInstance({
        name: req.body.name,
        mrp: req.body.mrp,
        quantity: req.body.quantity,
        date_of_entry: req.body.date_of_entry,
        date_of_last_purchase: req.body.date_of_last_purchase,
        date_of_last_sale: req.body.date_of_last_sale,
        batch_no: req.body.batch_no,
        name_of_purchasee: req.body.name_of_purchasee,
        name_of_seller: req.body.name_of_seller
    });

  // Save drug in the database
    drug.create(drug, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the drug."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
  Drug.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving drugs."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Drug.findById(req.params.drugId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found drug with id ${req.params.drugId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving drug with id " + req.params.drugId
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Drug.updateById(
    req.params.drugId,
    Drug.getInstance(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found drug with id ${req.params.drugId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating drug with id " + req.params.drugId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Drug.remove(req.params.drugId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found drug with id ${req.params.drugId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete drug with id " + req.params.drugId
        });
      }
    } else res.send({ message: `drug was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Drug.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all drugs."
      });
    else res.send({ message: `All drugs were deleted successfully!` });
  });
};



