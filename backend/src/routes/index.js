const express = require("express");
const router = express.Router();

const dieselRoutes = require("../modules/diesel/diesel.routes");
const authRoutes = require("../modules/auth/auth.routes");
const truckRoutes = require("../modules/trucks/trucks.routes");
const paymentSourcesRoutes = require("../modules/payment-sources/payment-sources.routes");

router.use("/diesel", dieselRoutes);
router.use("/auth", authRoutes);
router.use("/trucks", truckRoutes);
router.use("/payment-sources", paymentSourcesRoutes);

module.exports = router;
