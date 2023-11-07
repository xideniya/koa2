const Order = require('../model/order.model')

class OrderService {
    async createOrder(order) {
        return Order.create(order)
    }

    async getAllOrder(obj) {
        const {pageSize, pageNum, status, user_id} = obj
        return Order.findAndCountAll({
            where: {
                user_id,
                status
            },
            limit: pageSize * 1,
            offset: (pageNum - 1) * pageSize,
            attributes: ['goods_info', 'total', 'order_number', 'status']
        })
    }
    async updateOrder(id, status) {
        return Order.update({
            status
        }, {
            where: {
                id
            }
        })
    }
}

module.exports = new OrderService()
