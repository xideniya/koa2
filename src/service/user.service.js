//操作数据库
const User = require('../model/user.model')

class UserService {
    //用户注册
    async createUser(user_name, password) {
        // 插入数据
        let res = await User.create({user_name, password})
        return res.dataValues
    }

    //查询用户信息
    async getUserInfo({id, user_name, password, is_admin}) {
        const whereOptions = {}
        id && Object.assign(whereOptions, {id})
        user_name && Object.assign(whereOptions, {user_name})
        password && Object.assign(whereOptions, {password})
        is_admin && Object.assign(whereOptions, {is_admin})
        let res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOptions
        })
        return res ? res.dataValues : null
    }

    //修改用户信息
    async updateUserinfoById({id, user_name, password, is_admin}) {
        const whereOptions = {id}
        const newUser = {}
        user_name && Object.assign(newUser, {user_name})
        password && Object.assign(newUser, {password})
        is_admin && Object.assign(newUser, {is_admin})
        let res = await User.update(newUser, {where: whereOptions})
        //失败返回[0],成功返回[n],n>0
        return res[0] > 0
    }

}

module.exports = new UserService()
