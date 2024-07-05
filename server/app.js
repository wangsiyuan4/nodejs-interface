const history = require("connect-history-api-fallback");
const express = require("express");
const opn = require('opn')
const app = express();
require('dotenv').config({ path: 'config.env' })

let httpPort = process.env.PORT;
const routeUrl = process.env.ROUTE;
const isOpen = process.env.OPEN_BROWSER;

function startServer(port) {
    app.use(routeUrl, history());
    app.use(routeUrl, express.static(process.env.WEB_PATH));

    const server = app.listen(port, () => {
        console.log(`服务器启动成功，请访问 http://localhost:${ port + routeUrl }`);
        if(isOpen) {
            opn(`http://127.0.0.1:${ port }`)
        }
    });

    server.on("error", (err) => {
        if(err.code === "EADDRINUSE") {
            console.log(`端口 ${ port } 已被占用，尝试使用下一个可用端口`);
            startServer(port + 1); // 尝试使用下一个端口
        } else {
            console.error(err);
        }
    });
}

startServer(httpPort);
