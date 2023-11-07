const Router = require('koa-router')
const {auth} = require("../middleware/auth.middleware");
const {orderValidator} = require("../middleware/order.middleware");
const {addOrder, getOrder, update} = require('../controller/order.controller')
const router = new Router({
    prefix: '/orders'
})
router.post('/', auth, orderValidator({
    address_id: 'int',
    goods_info: 'string',
    total: 'string'
}), addOrder)
router.get('/', auth, getOrder)
router.patch('/:id', auth, orderValidator({
    status: 'number'
}), update)
module.exports = router
