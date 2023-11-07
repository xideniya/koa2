const Router = require('koa-router')
const router = new Router({prefix: '/address'})
const {auth} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/address.middleware')
const {addAddress,getAddress,putAddress,removeAddress,setDefaultAddress}=require('../controller/address.controller')
//新增地址
router.post('/', auth, validator({
    consignee: 'string',
    phone: {
        type: 'string',
        format: /^(?:(?:\+|00)86)?1\d{10}$/,
    },
    address: 'string'
}), addAddress)
//获取地址列表
router.get('/',auth,getAddress)
//更新地址
router.put('/:id',auth,validator({
    consignee: 'string',
    phone: {
        type: 'string',
        format: /^(?:(?:\+|00)86)?1\d{10}$/,
    },
    address: 'string'
}),putAddress)
//删除地址
router.delete('/:id',auth,removeAddress)
//设置默认
router.patch('/:id',auth,setDefaultAddress)
module.exports = router

