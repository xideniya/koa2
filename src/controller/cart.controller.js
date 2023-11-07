const {createOrUpdate, findCart, updateCart, removeCarts, selectAllService} = require('../service/cart.service')
const {cartParameterError} = require('../constant/err.type')

class CartController {
    async add(ctx) {
        const user_id = ctx.state.user.id
        const goods_id = ctx.request.body.goods_id
        let res = await createOrUpdate(user_id, goods_id)
        ctx.body = JSON.stringify({
            code: '0',
            message: '添加购物车成功',
            result: res
        })

    }

    async findAll(ctx) {
        const {pageNum = 1, pageSize = 10} = ctx.request.query
        const user_id = ctx.state.user.id
        let res = await findCart(pageNum, pageSize, user_id)
        ctx.body = JSON.stringify({
            code: '0',
            message: '获取购物车列表成功',
            result: res
        })

    }

    //更新购物车

    async update(ctx) {
        const id = ctx.request.params.id
        const {number, selected} = ctx.request.body
        if (number === undefined && selected === undefined) {
            return ctx.app.emit('error', cartParameterError, ctx)
        }
        let res = await updateCart(id, number, selected)
        if (res) {
            ctx.body = JSON.stringify({
                code: '0',
                message: '更新购物车成功',
                result: res
            })
        } else {
            ctx.app.emit('error', {code: '10018', message: '商品ID无效', result: ''}, ctx)
        }
    }

    async remove(ctx) {
        const {idList} = ctx.request.body
        let res = await removeCarts(idList)
        if (res) {
            ctx.body = JSON.stringify({
                code: '0',
                message: '删除购物车成功',
                result: ''
            })
        } else {
            ctx.status = 500
            ctx.body = JSON.stringify({
                code: '10056',
                message: '删除购物车失败',
                result: ''
            })
        }

    }

    //购物车全选
    async selectAll(ctx) {
        let user_id = ctx.state.user.id
        const {choose} = ctx.request.body
        let res = await selectAllService(user_id, choose)
        if (res) {
            ctx.body = JSON.stringify({
                code: 0,
                message: choose?'全选成功':'取消全选成功',
                result: res
            })
        }
    }
}

module.exports = new CartController()
