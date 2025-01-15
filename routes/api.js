// import PatientController
const PatientController = require("../controllers/PatientController");

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get("/patients", PatientController.all); // GET All Patients
router.post("/patients", PatientController.create); // POST Create Patient
router.get("/patients/:id", PatientController.show); // GET Single Patient by ID
router.put("/patients/:id", PatientController.update); // PUT Update Patient by ID
router.delete("/patients/:id", PatientController.destroy); // DELETE Patient by ID
router.get("/patients/search/:name", PatientController.search); // Search Patient by Name
router.get("/patients/status/positive", PatientController.positive); // Get Positive Patients
router.get("/patients/status/recovered", PatientController.recovered); // Get Recovered Patients
router.get("/patients/status/dead", PatientController.dead); // Get Dead Patients

// export router
module.exports = router;
