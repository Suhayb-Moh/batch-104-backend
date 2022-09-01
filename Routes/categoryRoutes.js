const express = require("express");
const multer = require("multer");
const categoryController = require("../Controllers/categoryController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, files, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let extension = files.mimetype.split("/")[1];
    cb(null, files.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage: storage });

router
  .route("/")
  .post(upload.single("image"), categoryController.createCategory)
  .get(categoryController.getCategories);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .delete(categoryController.deleteCategory)
  .put(categoryController.updateCategory);

module.exports = router;
