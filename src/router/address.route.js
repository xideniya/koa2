const Router = require('koa-router')
const router = new Router({prefix: '/address'})
const {auth} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/address.middleware')
const {addAddress,getAddress}=require('../controller/address.controller')
router.post('/', auth, validator({
    consignee: 'string',
    phone: {
        type: 'string',
        format: /^(?:(?:\+|00)86)?1\d{10}$/,
    },
    address: 'string'
}), addAddress)
router.get('/',auth,getAddress)
module.exports = router

