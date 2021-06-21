module.exports = app => {
  const drugs = require("../controllers/drug.controller.js");

  // Create a new drug
  app.post("/drug", drugs.create);

  // Retrieve all drugs
  app.get("/drugs", drugs.findAll);

  // Retrieve a single drug with drugId
  app.get("/drugs/:drugId", drugs.findOne);

  // Update a drug with drugId
  app.put("/drugs/:drugId", drugs.update);

  // Delete a drug with drugId
  app.delete("/drugs/:drugId", drugs.delete);

  // Create a new drug
  app.delete("/drugs", drugs.deleteAll);
};
