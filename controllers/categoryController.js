const { AssetCategory } = require("../models");

exports.list = async (req, res) => {
  try {
    const categories = await AssetCategory.findAll({ order: [["category_name", "ASC"]] });
    res.render("category/list", { title: "Asset Category Master", categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load categories");
  }
};

exports.new = (req, res) => {
  res.render("category/form", { title: "Add Category", category: {} });
};

exports.create = async (req, res) => {
  try {
    await AssetCategory.create({
      category_name: req.body.category_name,
      description: req.body.description
    });
    res.redirect("/categories");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to create category");
  }
};

exports.edit = async (req, res) => {
  try {
    const category = await AssetCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("category/form", { title: "Edit Category", category });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load category");
  }
};

exports.update = async (req, res) => {
  try {
    const category = await AssetCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send("Category not found");
    }

    await category.update({
      category_name: req.body.category_name,
      description: req.body.description
    });

    res.redirect("/categories");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to update category");
  }
};
