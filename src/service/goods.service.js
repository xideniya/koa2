const Goods = require('../model/goods.model')

class GoodsService {
    async creategoods(goods) {
        let res = await Goods.create(goods)
        return res.dataValues
    }

    async updateGoodsService(id, goods) {
        let res = await Goods.update(goods, {
            where: {
                id
            }
        })
        return res[0] > 0
    }

    async deleteGoodsService(id) {
        let res = await Goods.destroy({
            where: {
                id
            }
        })
        return res > 0
    }

    async onGoodsService(id) {
        let res = await Goods.restore({
            where: {
                id
            }
        })
        return res > 0
    }

    async findAllService(pageNum, pageSize) {
        //获取总数
        const count = await Goods.count()
        //获取分页数据
        const list = await Goods.findAll({
            offset: (pageNum - 1) * pageSize,
            limit: pageSize * 1
        })
        return {
            pageNum,
            pageSize,
            total:count,
            list
        }
    }
}

module.exports = new GoodsService()
