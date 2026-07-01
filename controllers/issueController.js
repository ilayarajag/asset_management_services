const { Asset, AssetCategory, Employee, AssetIssue, AssetHistory } = require("../models");

exports.new = async (req, res) => {
  try {
    const [assets, employees] = await Promise.all([
      Asset.findAll({ where: { status: "Available" }, include: AssetCategory, order: [["asset_uid", "ASC"]] }),
      Employee.findAll({ where: { status: true }, order: [["employee_name", "ASC"]] })
    ]);

    res.render("issue/issue", { title: "Issue Asset", assets, employees, success: req.query.success });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load issue form");
  }
};

exports.create = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.body.asset_id);
    if (!asset || asset.status !== "Available") {
      return res.status(400).send("Selected asset is not available for issue");
    }

    const employee = await Employee.findByPk(req.body.employee_id);
    if (!employee) {
      return res.status(400).send("Employee not found");
    }

    await AssetIssue.create({
      asset_id: asset.id,
      employee_id: employee.id,
      issue_date: req.body.issue_date,
      expected_return: req.body.expected_return,
      status: "Issued"
    });

    await asset.update({ status: "Issued" });
    await AssetHistory.create({
      asset_id: asset.id,
      employee_id: employee.id,
      action: "Issued",
      remarks: `Issued to ${employee.employee_name}`,
      action_date: new Date()
    });

    res.redirect("/issues/new?success=1");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to issue asset");
  }
};
