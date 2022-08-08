const express = require("express");

const categoryController = require("../Controllers/categoryController");
const router = express.Router();

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getCategories);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .delete(categoryController.deleteCategory)
  .put(categoryController.updateCategory);

module.exports = router;
