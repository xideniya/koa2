const {goodsFormatError}=require('../constant/err.type')
//商品参数验证
const goodsValidator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_name: {
                type: 'string',
                required: true
            },
            goods_price: {
                type: 'number',
                required: true
            },
            goods_num: {
                type: 'number',
                required: true
            },
            goods_img: {
                type: 'string',
                required: true
            },
        })
    } catch (e) {
        goodsFormatError.result=e
        ctx.app.emit('error',goodsFormatError,ctx)
        return
    }
    await next()
}
module.exports = {
    goodsValidator
}
