const {createOrder, getAllOrder, updateOrder} = require('../service/order.service')

class OrderController {
    async addOrder(ctx) {
        const user_id = ctx.state.user.id
        const {address_id, goods_info, total} = ctx.request.body
        const order_number = 'zd' + Date.now()
        const res = await createOrder({user_id, address_id, goods_info, total, order_number})
        ctx.body = JSON.stringify({
            code: '0',
            message: '创建订单成功',
            result: res
        })
    }

//获取订单列表
    async getOrder(ctx) {
        const {pageNum = 1, pageSize = 10, status = 0} = ctx.request.query
        const user_id = ctx.state.user.id
        let res = await getAllOrder({pageSize, pageNum, status, user_id})
        ctx.body = JSON.stringify({
            code: '0',
            message: '获取订单列表成功',
            result: res
        })
    }

//更新订单
    async update(ctx) {
        let id = ctx.request.params.id
        const {status} = ctx.request.body
        let res = await updateOrder(id, status)
        if (res[0] > 0) {
            ctx.body = JSON.stringify({
                code: '0',
                message: '更新订单成功',
                result: res[0]
            })
        }
    }

}

module.exports = new OrderController()
