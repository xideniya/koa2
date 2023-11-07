//用户授权的中间件
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config/config.defaults")
const {tokenExpiredError, JsonWebTokenError, NotBeforeError, notAdmin,notLogin} = require('../constant/err.type')
//判断用户是否登录
const auth = async (ctx, next) => {
    const {authorization} = ctx.request.header
    //用户登录，未携带token
    if (!authorization){
        ctx.app.emit('error', notLogin, ctx)
        return
    }
    const token = authorization.split(' ')[1]
    try {
        //添加用户信息
        ctx.state.user = jwt.verify(token, JWT_SECRET)
    } catch (e) {
        switch (e.name) {
            case 'TokenExpiredError':
                ctx.app.emit('error', tokenExpiredError, ctx)
                return
            case 'JsonWebTokenError':
                ctx.app.emit('error', JsonWebTokenError, ctx)
                return
            case 'NotBeforeError':
                ctx.app.emit('error', NotBeforeError, ctx)
                return
        }
    }
    await next()
}
const hasAdminPermission = async (ctx, next) => {
    const {is_admin} = ctx.state.user
    if (is_admin) {
       await next()
    } else {
        ctx.app.emit('error', notAdmin, ctx)
    }
}
module.exports = {
    auth,
    hasAdminPermission
}
