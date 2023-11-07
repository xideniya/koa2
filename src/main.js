const app=require('./app/index')
const {APP_PORT} = require('./config/config.defaults')
app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`)
})
