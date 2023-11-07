const Router = require('koa-router')
const {userValidator, verifyUser, bcryptPassword, verifyLogin} = require('../middleware/user.middleware')
const {auth}=require('../middleware/auth.middleware')
const {register, login,changePassword} = require('../controller/user.controller')
const router = new Router({
    prefix: '/users'
})
//注册路由
router.post('/register', userValidator, verifyUser, bcryptPassword, register)
//登录路由
router.post('/login', userValidator, verifyLogin, login)
//修改用户密码
router.patch('/', auth,bcryptPassword,changePassword)
module.exports = router
