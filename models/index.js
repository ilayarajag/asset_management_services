const sequelize = require("../config/database");

const Employee = require("./employee")(sequelize);
const Asset = require("./asset")(sequelize);
const AssetCategory = require("./assetCategory")(sequelize);
const AssetIssue = require("./assetIssue")(sequelize);
const AssetHistory = require("./assetHistory")(sequelize);

Asset.belongsTo(AssetCategory,{
    foreignKey:"category_id"
});

AssetCategory.hasMany(Asset,{
    foreignKey:"category_id"
});

AssetIssue.belongsTo(Employee,{
    foreignKey:"employee_id"
});

Employee.hasMany(AssetIssue,{
    foreignKey:"employee_id"
});

AssetIssue.belongsTo(Asset,{
    foreignKey:"asset_id"
});

Asset.hasMany(AssetIssue,{
    foreignKey:"asset_id"
});

AssetHistory.belongsTo(Asset, {
    foreignKey: "asset_id"
});

Asset.hasMany(AssetHistory, {
    foreignKey: "asset_id"
});

AssetHistory.belongsTo(Employee, {
    foreignKey: "employee_id"
});

Employee.hasMany(AssetHistory, {
    foreignKey: "employee_id"
});

module.exports={
    sequelize,
    Employee,
    Asset,
    AssetCategory,
    AssetIssue,
    AssetHistory
};