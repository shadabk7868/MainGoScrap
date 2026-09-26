const express = require("express");
const router = express.Router();

const {
  createVehicle, getVehicles ,login ,getVehicleById ,updateVehicle , deleteVehicle ,getDashboardStats
} = require("../controllers/vehicleController");


router.post("/login", login);

router.post("/", createVehicle);
router.get("/", getVehicles);
router.get("/stats/dashboard", getDashboardStats);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);


module.exports = router;