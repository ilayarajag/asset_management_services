const { Employee, Asset, AssetCategory, AssetIssue } = require("../models");

exports.dashboard = async (req, res) => {
  try {
    const [employeeCount, assetCount, categoryCount, issuedCount] = await Promise.all([
      Employee.count(),
      Asset.count({ where: { status: { $ne: "Scrapped" } } }),
      AssetCategory.count(),
      AssetIssue.count({ where: { status: "Issued" } })
    ]);

    res.render("index", {
      title: "Asset Dashboard",
      employeeCount,
      assetCount,
      categoryCount,
      issuedCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load dashboard");
  }
};
