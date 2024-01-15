const history = require("connect-history-api-fallback");
const express = require("express");
const opn = require('opn')
const app = express();
let httpPort = 8080;

function startServer(port) {
    app.use(history());
    app.use(express.static("./docs"));

    const server = app.listen(port, () => {
        console.log(`服务器启动成功，请访问 http://localhost:${ port }`);
        opn(`http://127.0.0.1:${ port }`)
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
