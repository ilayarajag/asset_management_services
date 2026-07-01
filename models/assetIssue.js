const { DataTypes } = require("sequelize");

module.exports=(sequelize)=>{

return sequelize.define("AssetIssue",{

id:{
type:DataTypes.INTEGER,
primaryKey:true,
autoIncrement:true
},

asset_id:{
type:DataTypes.INTEGER
},

employee_id:{
type:DataTypes.INTEGER
},

issue_date:{
type:DataTypes.DATEONLY
},

expected_return:{
type:DataTypes.DATEONLY
},

return_date:{
type:DataTypes.DATEONLY
},

status:{
type:DataTypes.ENUM(
"Issued",
"Returned"
),
defaultValue:"Issued"
}

});

};