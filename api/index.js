const http = require("http")
const fs = require("fs")
const path = require("path")
const express = require("express")
const app = express()
app.use(express.json())

/*为app添加中间件处理跨域请求*/
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const historyJson = require('./json/协调控制(历史).json')
app.post('/history', (req, res) => {
  console.log(req.body)
  res.send(historyJson)
})

const realTimeJson = require('./json/功率互济+协调控制(实时).json')
app.post('/realTime', (req, res) => {
  res.send(realTimeJson)
})

app.listen(8000)
console.log('8000服务已启动');