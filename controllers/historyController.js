const { AssetHistory, Asset, Employee } = require("../models");

exports.list = async (req, res) => {
  try {
    const history = await AssetHistory.findAll({
      include: [Asset, Employee],
      order: [["action_date", "DESC"]]
    });

    res.render("reports/history", { title: "Asset History", history });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load history");
  }
};
