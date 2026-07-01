const { Asset, Employee, AssetIssue, AssetHistory } = require("../models");

exports.new = async (req, res) => {
  try {
    const issues = await AssetIssue.findAll({
      where: { status: "Issued" },
      include: [Asset, Employee],
      order: [["issue_date", "DESC"]]
    });

    res.render("issue/return", { title: "Return Asset", issues });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load return form");
  }
};

exports.create = async (req, res) => {
  try {
    const issue = await AssetIssue.findByPk(req.body.issue_id, { include: [Asset, Employee] });
    if (!issue) {
      return res.status(404).send("Issue record not found");
    }

    await issue.update({
      return_date: req.body.return_date,
      status: "Returned"
    });

    await issue.Asset.update({ status: "Returned" });
    await AssetHistory.create({
      asset_id: issue.asset_id,
      employee_id: issue.employee_id,
      action: "Returned",
      remarks: req.body.reason || "Returned to stock",
      action_date: new Date()
    });

    res.redirect("/returns/new");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to return asset");
  }
};
