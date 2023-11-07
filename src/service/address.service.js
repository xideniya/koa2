const Address = require('../model/address.model')

class AddressService {
    async createAddress(info) {
        return Address.create(info);
    }

    async getAddressService(user_id) {
        return Address.findAndCountAll({
            where: {
                user_id
            }
        })
    }

    async putAddressService(info) {
        const {user_id, address, phone, consignee, id} = info
        return Address.update({address, phone, consignee}, {
            where: {
                user_id,
                id
            }
        })
    }

    async removeAddressService(info) {
        const {user_id, id} = info
        return Address.destroy({
            where: {
                id,
                user_id
            }
        })
    }

    async setDefaultService(info) {
        const {user_id, id} = info
        await Address.update({is_default: false}, {
            where: {
                user_id
            }
        })
        return Address.update({is_default: true}, {
            where: {
                user_id,
                id
            }
        })
    }
}

module.exports = new AddressService()
