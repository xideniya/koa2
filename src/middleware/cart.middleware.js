const {cartFormatError} = require('../constant/err.type')
//验证购物车请求体数据中间件
const cartValidator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (e) {
            cartFormatError.result = e
            return ctx.app.emit('error', cartFormatError, ctx)
        }
        await next()
    }
}
module.exports = {
    cartValidator
}
