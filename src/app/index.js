const path=require('path')
const Koa = require('koa');
const {koaBody} = require('koa-body');
const KoaStatic=require('koa-static')
const app = new Koa()
const parameter = require('koa-parameter');
const router=require('../router/index')
const errorHandler = require('./errorHandlers')
//处理请求的body
app.use(koaBody({
    multipart:true,//上传文件
    formidable:{
        uploadDir:path.join(__dirname,'../upload'),//文件上传路径
        keepExtensions:true, //保留后缀
    },
    parsedMethods:['POST','PUT','PATCH','DELETE']//对数组中的方法的请求体进行处理
}))
app.use(KoaStatic(path.join(__dirname,'../upload')))
//参数校验
app.use(parameter(app))
//注册路由
app.use(router.routes())
//不支持的http请求方式
app.use(router.allowedMethods())
//统一错误处理
app.on('error', errorHandler)
module.exports = app
