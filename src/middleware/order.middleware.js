//验证订单请求体数据中间件
const orderValidator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (e) {
            return ctx.app.emit('error', {
                code:'30100',
                message:'订单参数错误',
                result:e
            }, ctx)
        }
        await next()
    }
}
module.exports = {
    orderValidator
}
