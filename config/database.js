const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "asset_management",
    "postgres",
    "password",
    {
        host: "localhost",
        port: 5432,
        password: "admin123",
        dialect: "postgres",
        logging: false
    }
);

module.exports = sequelize;