const history = require("connect-history-api-fallback");
const express = require("express");
const opn = require('opn');
const fs = require('fs');
require('dotenv').config({ path: 'config.env' });

let httpPort = process.env.PORT;
const routeUrl = process.env.ROUTE;
const isOpen = process.env.OPEN_BROWSER;
const fileUrl = process.env.WEB_PATH
let list = []

function startServer(port) {
    if(process.env.JSON_FILE && process.env.START_LIST === 'true') {
        // 使用异步方法读取文件
        fs.readFile(process.env.JSON_FILE, 'utf8', (err, data) => {
            if(err) {
                console.error('Error reading file:', err);
            }
            list = JSON.parse(data)
            if(list?.length) {
                list.forEach(item => {
                    let server = createServer({
                        app: express(),
                        routeUrl: item?.route,
                        port: item?.port,
                        isOpen: item?.isOpen,
                        fileUrl: item?.fileUrl,
                        name: item?.name
                    })
                    server.on("error", (err) => {
                        if(err.code === "EADDRINUSE") {
                            console.log(`端口 ${ item?.port } 已被占用，尝试使用下一个可用端口`);
                            startServer(item?.port + 1); // 尝试使用下一个端口
                        } else {
                            console.error(err);
                        }
                    });
                })
            }
        });
    } else {
        let server = createServer({ app: express(), port, isOpen, routeUrl, fileUrl })
        server.on("error", (err) => {
            if(err.code === "EADDRINUSE") {
                console.log(`端口 ${ port } 已被占用，尝试使用下一个可用端口`);
                startServer(port + 1); // 尝试使用下一个端口
            } else {
                console.error(err);
            }
        });
    }
}

function createServer({ app, routeUrl, port, isOpen, fileUrl, name }) {
    app.use(routeUrl, history());
    app.use(routeUrl, express.static(fileUrl));

    return app.listen(port, '0.0.0.0', () => { // 监听所有 IP
        console.log(`服务器启动成功，请访问 http://localhost:${ port + routeUrl } 或 http://${ getLocalIPAddress() }:${ port + routeUrl } ---${name}`);
        if(isOpen === 'true') {
            opn(`http://127.0.0.1:${ port }`);
        }
    });
}

// 获取局域网 IP 地址的函数
function getLocalIPAddress() {
    const os = require('os');
    const iFaces = os.networkInterfaces();
    for(const iFace in iFaces) {
        for(const alias of iFaces[iFace]) {
            if(alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '127.0.0.1'; // 默认返回 localhost
}

startServer(httpPort);
