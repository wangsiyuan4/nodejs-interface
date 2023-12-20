// 代理前端Vue项目
const history = require('connect-history-api-fallback')
const express = require('express')

const app = express()
const httpPort = 8082

// 解决history路由问题
app.use(history())
// 静态资源
app.use(express.static('./dist'))
// 启动服务器
app.listen(httpPort, () => {
    console.log(`服务器启动成功，请访问 http://localhost:${ httpPort }`)
})
