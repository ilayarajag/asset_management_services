const { DataTypes } = require("sequelize");

module.exports=(sequelize)=>{

return sequelize.define("AssetHistory",{

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

action:{
type:DataTypes.STRING
},

remarks:{
type:DataTypes.STRING
},

action_date:{
type:DataTypes.DATE,
defaultValue:DataTypes.NOW
}

});

};