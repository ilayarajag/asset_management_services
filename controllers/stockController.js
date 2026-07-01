const { Asset, AssetCategory } = require("../models");

exports.view = async (req, res) => {
  try {
    const assets = await Asset.findAll({
      where: { status: "Available" },
      include: AssetCategory,
      order: [["branch", "ASC"]]
    });

    const branchSummary = assets.reduce((acc, asset) => {
      const branch = asset.branch || "Unknown";
      if (!acc[branch]) {
        acc[branch] = { branch, count: 0, value: 0 };
      }
      acc[branch].count += 1;
      acc[branch].value += Number(asset.purchase_price || 0);
      return acc;
    }, {});

    res.render("stock/list", {
      title: "Stock View",
      assets,
      branchSummary: Object.values(branchSummary)
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load stock view");
  }
};
