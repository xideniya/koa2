const {addressFormatError} = require('../constant/err.type')
const validator = (rules) => {
    return async (ctx, next) => {
        try {
            await ctx.verifyParams(rules)
        } catch (e) {
            addressFormatError.result = e
            ctx.app.emit('error', addressFormatError, ctx)
            return
        }
        await next()
    }
}
module.exports = {
    validator
}
