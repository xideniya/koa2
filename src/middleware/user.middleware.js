const {getUserInfo} = require("../service/user.service");
const bcrypt = require('bcryptjs');
const {
    userFormatError,
    userAlreadyExists,
    userRegisterError,
    userDontExist,
    userLoginFailure,
    userPasswordError
} = require('../constant/err.type')
//请求体中用户名或密码是否为空的中间件
const userValidator = async (ctx, next) => {
    const {user_name, password} = ctx.request.body
    //合法性
    if (!user_name || !password) {
        ctx.app.emit('error', userFormatError, ctx)
        return
    }
    await next()

}
//用户是否存在的中间件
const verifyUser = async (ctx, next) => {
    const {user_name} = ctx.request.body
    //合理性
    try {
        let res = await getUserInfo({user_name})
        if (res) {
            ctx.app.emit('error', userAlreadyExists, ctx)
            return
        }
    } catch (err) {
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}
//加密中间件
const bcryptPassword = async (ctx, next) => {
    const {password} = ctx.request.body
    const salt = bcrypt.genSaltSync(10);
    ctx.request.body.password = bcrypt.hashSync(password, salt)
    await next()
}
//登录时验证用户名密码
const verifyLogin = async (ctx, next) => {
    const {user_name, password} = ctx.request.body
    try {
        let res = await getUserInfo({user_name})
        //用户名不存在
        if (!res) {
            ctx.app.emit('error', userDontExist, ctx)
            return
        }
        //密码错误
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', userPasswordError, ctx)
            return
        }

    } catch (err) {
        ctx.app.emit('error', userLoginFailure, ctx)
        return
    }

    await next()
}
module.exports = {
    userValidator,
    verifyUser,
    bcryptPassword,
    verifyLogin
}
