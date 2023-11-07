const {createAddress, getAddressService} = require('../service/createAddress.service')

class AddressController {
    async addAddress(ctx) {
        const user_id = ctx.state.user.id
        const {address, phone, consignee} = ctx.request.body
        const res = await createAddress({user_id, address, phone, consignee})
        ctx.body = JSON.stringify({
            code: '0',
            message: '添加地址成功',
            result: res
        })
    }

    async getAddress(ctx) {
        const user_id = ctx.state.user.id
        const res = await getAddressService(user_id)
        ctx.body = JSON.stringify({
            code: 0,
            message: '获取地址列表成功',
            result: res
        })
    }
}

module.exports = new AddressController()
