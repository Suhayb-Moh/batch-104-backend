const Category = require("../Models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
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
