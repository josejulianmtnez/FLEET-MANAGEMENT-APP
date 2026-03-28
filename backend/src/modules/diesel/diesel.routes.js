const express = require("express");
const router = express.Router();

const controller = require("./diesel.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.use(authMiddleware);

router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/balance", authMiddleware, controller.getBalance);

module.exports = router;
