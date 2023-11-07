const path = require('path')
const {uploadError, createGoodsError, invalidGoodsId} = require('../constant/err.type')
const {
    creategoods,
    updateGoodsService,
    deleteGoodsService,
    onGoodsService,
    findAllService
} = require('../service/goods.service')

class GoodsController {
    //图片上传
    async goodsUpload(ctx, next) {
        const {file} = ctx.request.files
        if (file.filepath) {
            ctx.body = JSON.stringify({
                code: '0',
                message: '文件上传成功',
                result: {
                    image: path.basename(file.filepath)
                }
            })
        } else {
            ctx.app.emit('error', uploadError, ctx)
        }
    }

    //上传商品信息
    async createGoods(ctx) {
        try {
            let result = await creategoods(ctx.request.body)
            ctx.body = JSON.stringify({
                code: '0',
                message: '发布商品成功',
                result
            })
        } catch (e) {
            ctx.app.emit('error', createGoodsError, ctx)
        }
    }

//更新商品信息
    async updateGoods(ctx) {
        try {
            let res = await updateGoodsService(ctx.params.id, ctx.request.body)
            if (res) {
                ctx.body = JSON.stringify({
                    code: '0',
                    message: '修改商品成功',
                    result: ''
                })
            } else {
                ctx.app.emit('error', invalidGoodsId, ctx)
            }
        } catch (e) {
            console.log(e)
        }
    }

//删除商品
    async deleteGoods(ctx) {
        try {
            let res = await deleteGoodsService(ctx.params.id)
            if (res) {
                ctx.body = JSON.stringify({
                    code: '0',
                    message: '删除商品成功',
                    result: ''
                })
            } else {
                ctx.app.emit('error', invalidGoodsId, ctx)
            }
        } catch (e) {
            console.log(e)
        }
    }

    //下架商品
    async offGoods(ctx) {
        try {
            let res = await deleteGoodsService(ctx.params.id)
            if (res) {
                ctx.body = JSON.stringify({
                    code: '0',
                    message: '下架商品成功',
                    result: ''
                })
            } else {
                ctx.app.emit('error', invalidGoodsId, ctx)
            }
        } catch (e) {
            console.log(e)
        }
    }

    //上架商品

    async onGoods(ctx) {
        try {
            let res = await onGoodsService(ctx.params.id)
            if (res) {
                ctx.body = JSON.stringify({
                    code: '0',
                    message: '上架商品成功',
                    result: ''
                })
            } else {
                ctx.app.emit('error', invalidGoodsId, ctx)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async findAll(ctx) {
        const {pageNum = 1, pageSize = 10} = ctx.request.query
        let res = await findAllService(pageNum, pageSize)
        ctx.body = JSON.stringify({
            code: '0',
            message: '获取商品列表成功',
            result: res
        })
    }

}

module.exports = new GoodsController()
