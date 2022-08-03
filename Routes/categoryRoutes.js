const express = require("express");

const categoryController = require("../Controllers/categoryController");
const router = express.Router();

router.route("/createCategory").post(categoryController.createCategory);

module.exports = router;
