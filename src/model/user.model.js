const {DataTypes } = require('sequelize');
const sequelize = require('../db/seq')
//创建模型，数据表
const User=sequelize.define('zd_user',{
    user_name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        comment:'用户名，唯一',
    },
    password:{
        type:DataTypes.CHAR(64),
        allowNull: false,
        comment:'密码'
    },
    is_admin:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:0,
        comment:'是否为管理员'
    }
})
//同步数据库，创建数据表
// User.sync({force:true})
module.exports = User
