const Router = require('koa-router')
const router = new Router({prefix: '/goods'})
const {goodsUpload,createGoods,updateGoods,deleteGoods,offGoods,onGoods,findAll} = require('../controller/goods.controller')
const {auth, hasAdminPermission} = require('../middleware/auth.middleware')
const {goodsValidator}=require('../middleware/goods.middleware')
//图片上传
router.post('/upload', auth, hasAdminPermission, goodsUpload)
//上架商品
router.post('/',auth,hasAdminPermission,goodsValidator,createGoods)
//修改商品信息
router.put('/:id',auth,hasAdminPermission,goodsValidator,updateGoods)
//删除商品
router.delete('/:id',auth,hasAdminPermission,deleteGoods)
//下架商品
router.post('/:id/off',auth,hasAdminPermission,offGoods)
//上架商品
router.post('/:id/on',auth,hasAdminPermission,onGoods)
//获取商品列表
router.get('/',findAll)
module.exports = router
