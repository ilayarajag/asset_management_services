const { Op } = require("sequelize");
const { Employee } = require("../models");

exports.list = async (req, res) => {
  try {
    const where = {};
    const filters = { status: req.query.status || "", search: req.query.search || "" };

    if (filters.status) {
      where.status = filters.status === "true";
    }

    if (filters.search) {
      where[Op.or] = [
        { employee_name: { [Op.iLike]: `%${filters.search}%` } },
        { employee_code: { [Op.iLike]: `%${filters.search}%` } },
        { department: { [Op.iLike]: `%${filters.search}%` } }
      ];
    }

    const employees = await Employee.findAll({ where, order: [["employee_name", "ASC"]] });
    res.render("employee/list", { title: "Employee Master", employees, filters });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load employees");
  }
};

exports.new = (req, res) => {
  res.render("employee/form", { title: "Add Employee", employee: {} });
};

exports.create = async (req, res) => {
  try {
    await Employee.create({
      employee_code: req.body.employee_code,
      employee_name: req.body.employee_name,
      email: req.body.email,
      department: req.body.department,
      designation: req.body.designation,
      branch: req.body.branch,
      status: req.body.status === "true"
    });
    res.redirect("/employees");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to create employee");
  }
};

exports.edit = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    res.render("employee/form", { title: "Edit Employee", employee });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load employee");
  }
};

exports.update = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    await employee.update({
      employee_code: req.body.employee_code,
      employee_name: req.body.employee_name,
      email: req.body.email,
      department: req.body.department,
      designation: req.body.designation,
      branch: req.body.branch,
      status: req.body.status === "true"
    });

    res.redirect("/employees");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to update employee");
  }
};
