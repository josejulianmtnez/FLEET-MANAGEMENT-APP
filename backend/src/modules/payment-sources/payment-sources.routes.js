const express = require("express");
const router = express.Router();

const controller = require("./payment-sources.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.get("/", authMiddleware, controller.getAll);
router.post("/", authMiddleware, controller.create);
router.put("/:id", authMiddleware, controller.update);
router.delete("/:id", authMiddleware, controller.remove);

module.exports = router;
