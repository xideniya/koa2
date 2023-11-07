const cart = require('../model/cart.model')
const {Op} = require("sequelize");
const Goods = require('../model/goods.model')

class CartService {
    //商品加入购物车
    async createOrUpdate(user_id, goods_id) {
        let res = await cart.findOne({
            where: {
                [Op.and]: {
                    user_id,
                    goods_id
                }
            }
        })
        if (res) {
            await res.increment('number', {by: 1})
            return await res.reload()
        } else {
            return await cart.create({
                user_id,
                goods_id
            })
        }
    }

    async findCart(pageNum, pageSize, user_id) {
        let res = await cart.findAndCountAll({
            attributes: ['id', 'number', 'selected'],
            offset: (pageNum - 1) * pageSize,
            limit: pageSize * 1,
            include: {model: Goods, as: 'goods_info'},
            where: {
                user_id
            }
        })
        return {
            pageNum,
            pageSize,
            total: res.count,
            list: res.rows
        }
    }

    //更新购物车信息
    async updateCart(id, number, selected) {
        let res = await cart.findByPk(id)
        if (!res) return ''
        if (number !== undefined) {
            res.number = number
        }
        if (selected !== undefined) {
            res.selected = selected
        }
        return await res.save()
    }

    async removeCarts(idList) {
        console.log(idList)
        return await cart.destroy({
            where: {
                id: {
                    [Op.in]: idList
                }
            }
        })
    }

//购物车全选
    async selectAllService(user_id,choose) {
        let res= await cart.update({selected: choose}, {
            where: {
                user_id
            }
        })
        return res[0]

    }
}

module.exports = new CartService()
