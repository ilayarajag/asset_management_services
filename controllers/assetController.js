const { Op } = require("sequelize");
const { Asset, AssetCategory, AssetHistory } = require("../models");

exports.list = async (req, res) => {
  try {
    const filters = {
      category_id: req.query.category_id || "",
      status: req.query.status || "",
      search: req.query.search || ""
    };

    const where = { status: { [Op.ne]: "Scrapped" } };

    if (filters.category_id) {
      where.category_id = filters.category_id;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.search) {
      where[Op.or] = [
        { asset_uid: { [Op.iLike]: `%${filters.search}%` } },
        { serial_no: { [Op.iLike]: `%${filters.search}%` } },
        { make: { [Op.iLike]: `%${filters.search}%` } },
        { model: { [Op.iLike]: `%${filters.search}%` } }
      ];
    }

    const [assets, categories] = await Promise.all([
      Asset.findAll({ where, include: AssetCategory, order: [["asset_uid", "ASC"]] }),
      AssetCategory.findAll({ order: [["category_name", "ASC"]] })
    ]);

    res.render("asset/list", { title: "Asset Master", assets, categories, filters });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load assets");
  }
};

exports.new = async (req, res) => {
  try {
    const categories = await AssetCategory.findAll({ order: [["category_name", "ASC"]] });
    res.render("asset/form", { title: "Add Asset", asset: {}, categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load asset form");
  }
};

exports.create = async (req, res) => {
  try {
    await Asset.create({
      asset_uid: req.body.asset_uid,
      serial_no: req.body.serial_no,
      category_id: req.body.category_id,
      make: req.body.make,
      model: req.body.model,
      purchase_date: req.body.purchase_date,
      purchase_price: req.body.purchase_price,
      branch: req.body.branch,
      status: req.body.status || "Available"
    });

    await AssetHistory.create({
      action: "Created",
      remarks: `Asset ${req.body.asset_uid} added to inventory`,
      action_date: new Date()
    });

    res.redirect("/assets");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to create asset");
  }
};

exports.edit = async (req, res) => {
  try {
    const [asset, categories] = await Promise.all([
      Asset.findByPk(req.params.id),
      AssetCategory.findAll({ order: [["category_name", "ASC"]] })
    ]);

    if (!asset) {
      return res.status(404).send("Asset not found");
    }

    res.render("asset/form", { title: "Edit Asset", asset, categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load asset");
  }
};

exports.update = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) {
      return res.status(404).send("Asset not found");
    }

    await asset.update({
      asset_uid: req.body.asset_uid,
      serial_no: req.body.serial_no,
      category_id: req.body.category_id,
      make: req.body.make,
      model: req.body.model,
      purchase_date: req.body.purchase_date,
      purchase_price: req.body.purchase_price,
      branch: req.body.branch,
      status: req.body.status || asset.status
    });

    res.redirect("/assets");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to update asset");
  }
};
