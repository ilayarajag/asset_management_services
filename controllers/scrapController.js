const { Op } = require("sequelize");
const { Asset, AssetHistory } = require("../models");

exports.list = async (req, res) => {
  try {
    const assets = await Asset.findAll({ where: { status: { [Op.ne]: "Scrapped" } }, order: [["asset_uid", "ASC"]] });
    res.render("issue/scrap", { title: "Scrap Asset", assets });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load scrap screen");
  }
};

exports.scrap = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.body.asset_id);
    if (!asset) {
      return res.status(404).send("Asset not found");
    }

    await asset.update({ status: "Scrapped" });
    await AssetHistory.create({
      asset_id: asset.id,
      action: "Scrapped",
      remarks: req.body.reason || "Marked obsolete",
      action_date: new Date()
    });

    res.redirect("/scrap");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to scrap asset");
  }
};
