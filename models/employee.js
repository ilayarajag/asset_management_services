const { DataTypes } = require("sequelize");

module.exports=(sequelize)=>{

return sequelize.define("Employee",{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    employee_code:{
        type:DataTypes.STRING,
        unique:true
    },

    employee_name:{
        type:DataTypes.STRING
    },

    email:{
        type:DataTypes.STRING
    },

    department:{
        type:DataTypes.STRING
    },

    designation:{
        type:DataTypes.STRING
    },

    branch:{
        type:DataTypes.STRING
    },

    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }

},{
timestamps:true
});

};