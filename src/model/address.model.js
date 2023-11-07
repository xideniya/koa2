const {DataTypes}=require('sequelize')
const seq=require('../db/seq')
const Address=seq.define('zd_address',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户id'
    },
    consignee:{
        type:DataTypes.STRING,
        allowNull: false,
        comment: '收件人姓名'
    },
    phone:{
        type:DataTypes.CHAR(11),
        allowNull:false,
        comment:'手机号码'
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'收货地址'
    },
    is_default:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        comment:'是否为默认地址',
        defaultValue:false
    }
})
// Address.sync({})
module.exports=Address
