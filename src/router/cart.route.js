const Router = require('koa-router')
const router = new Router({prefix: '/carts'})
const {auth} = require('../middleware/auth.middleware')
const {cartValidator} = require('../middleware/cart.middleware')
const {add, findAll, update, remove, selectAll} = require('../controller/cart.controller')
//加入购物车
router.post('/', auth, cartValidator({goods_id: 'number'}), add)
//获取购物车列表
router.get('/', auth, findAll)
//更新购物车
router.patch('/:id', auth, cartValidator({
    number: {
        type: 'number',
        required: false
    },
    selected: {
        type: 'bool',
        required: false
    }
}), update)
router.delete('/', auth, cartValidator({
    idList: {
        required: true,
        type: 'array'
    }
}), remove)
router.post('/selectAll', auth, cartValidator({
    choose: {
        type: 'bool',
        required: true
    }
}), selectAll)
module.exports = router
