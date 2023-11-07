const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
const Goods=require('./goods.model')
const Cart = seq.define('zd-cart', {
    user_id:{
        allowNull:false,
        type:DataTypes.INTEGER,
        comment:'用户ID'
    },
    goods_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品ID'
    },
    number:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1,
        comment:'商品数量'
    },
    selected:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true,
        comment:'是否被选中'
    }
})
// Cart.sync()
//联表
Cart.belongsTo(Goods,{
    foreignKey:'goods_id',
    as:'goods_info'
})
module.exports=Cart
