const Address=require('../model/address.model')
class CreateAddressService {
    async createAddress(info) {
         return Address.create(info);
    }
    async getAddressService(user_id){
        return Address.findAndCountAll({
            where:{
                user_id
            }
        })
    }
}

module.exports = new CreateAddressService()
