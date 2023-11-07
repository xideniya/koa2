const {createUser, getUserInfo, updateUserinfoById} = require('../service/user.service')
const {userRegisterError, getUserInfoFailed, updatePasswordFailed} = require('../constant/err.type')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config/config.defaults")

class UserController {
    //用户注册
    async register(ctx, next) {
        const {user_name, password} = ctx.request.body
        try {
            //操作数据库
            const result = await createUser(user_name, password)
            ctx.body = JSON.stringify({
                code: 0,
                message: '用户注册成功',
                result: {
                    id: result.id,
                    user_name: result.user_name
                }
            })
        } catch (err) {
            //捕获读写数据库时可能发生的错误
            ctx.app.emit('error', userRegisterError, ctx)
        }

    }

    //用户登录
    async login(ctx, next) {
        const {user_name} = ctx.request.body
        //获取用户信息
        try {
            let res = await getUserInfo({user_name})
            if (res) {
                const {id, is_admin} = res
                //生成token，有效时间一天
                let token = jwt.sign({id, user_name, is_admin}, JWT_SECRET, {expiresIn: '1d'});
                ctx.body = JSON.stringify({
                    code: '0',
                    message: '用户登录成功',
                    result: {
                        token
                    }
                })
            } else {
                ctx.app.emit('error', getUserInfoFailed, ctx)
            }
        } catch (e) {
            ctx.app.emit('error', getUserInfoFailed, ctx)
        }
    }

    //修改密码
    changePassword = async (ctx) => {
        //获取数据
        const id = ctx.state.user.id
        const password = ctx.request.body.password
        //操作数据库
        try {
            let res = await updateUserinfoById({id, password})
            if (res) {
                ctx.body = JSON.stringify(
                    {
                        code: '0',
                        message: '修改密码成功',
                    }
                )
            } else {
                ctx.app.emit('error', updatePasswordFailed, ctx)
            }
        } catch (e) {
            ctx.app.emit('error', updatePasswordFailed, ctx)
        }

    }
}

module.exports = new UserController()
