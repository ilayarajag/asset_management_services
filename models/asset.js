const { DataTypes } = require("sequelize");

module.exports=(sequelize)=>{

return sequelize.define("Asset",{

id:{
type:DataTypes.INTEGER,
primaryKey:true,
autoIncrement:true
},

asset_uid:{
type:DataTypes.STRING,
unique:true
},

serial_no:{
type:DataTypes.STRING,
unique:true
},

category_id:{
type:DataTypes.INTEGER
},

make:{
type:DataTypes.STRING
},

model:{
type:DataTypes.STRING
},

purchase_date:{
type:DataTypes.DATEONLY
},

purchase_price:{
type:DataTypes.DECIMAL(10,2)
},

branch:{
type:DataTypes.STRING
},

status:{
type:DataTypes.ENUM(
"Available",
"Issued",
"Returned",
"Scrapped"
),
defaultValue:"Available"
}

});

};