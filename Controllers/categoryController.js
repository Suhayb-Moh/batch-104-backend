const Category = require("../Models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    req.body.image = req.file.filename;
    const category = await Category.findOne({
      categoryName: req.body.categoryName,
    });
    if (category) {
      return res.status(400).json({ message: "category already exists" });
    }
    await Category.create(req.body);
    res.status(200).json({ message: "category created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error creating category" + " " + error.message });
  }
};

// get categories

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({ result: categories.length, categories });
  } catch (error) {
    return res.status(400).send({
      message: `Sorry something went wrong. Please try again ${error.message}`,
    });
  }
};

// get all categories

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    return res.status(200).send({ category });
  } catch (error) {
    return res.status(400).send({
      message: `Sorry something went wrong. Please try again ${error.message}`,
    });
  }
};

// delete category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error deleting category ${error.message}` });
  }
};

// update category
exports.updateCategory = async (req, res) => {
  try {
    await Category.findByIdandUpdate(req.params.id, req.body);
    return res.status(200).json({ message: `Category updated successfully` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error updating category ${error.message}` });
  }
};
