const {
    createAddress,
    getAddressService,
    putAddressService,
    removeAddressService,
    setDefaultService
} = require('../service/address.service')

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

    async putAddress(ctx) {
        const user_id = ctx.state.user.id
        const id = ctx.request.params.id
        const {address, phone, consignee} = ctx.request.body
        const res = await putAddressService({user_id, address, phone, consignee, id})
        if (res[0] > 0) {
            ctx.body = JSON.stringify({
                code: 0,
                message: '修改地址成功',
                result: res[0]
            })
        }
    }

    async removeAddress(ctx) {
        const user_id = ctx.state.user.id
        const id = ctx.request.params.id
        const res = await removeAddressService({user_id, id})
        if (res) {
            ctx.body = JSON.stringify({
                code: 0,
                message: '删除地址成功',
                result: res
            })
        }
    }
    async setDefaultAddress(ctx){
        const user_id = ctx.state.user.id
        const id = ctx.request.params.id
        const res = await setDefaultService({user_id, id})
        if (res[0]) {
            ctx.body = JSON.stringify({
                code: 0,
                message: '设置默认地址成功',
                result: res[0]
            })
        }
    }
}

module.exports = new AddressController()
