const http = require('http');
const url = require(`url`);
const fs = require(`fs`);

const port = 3001;

const server = http.createServer((req, res) => {

    const q = url.parse(req.url, true);
    let fileName = q.pathname.substring(1);
    let contentType;

    if (fileName.includes('html')) {

        contentType = "text/html";

    }

    if (contentType) {

        res.writeHead(200, { "Content-Type": contentType });
        res.end();

    } else {

        res.writeHead(404, { "Content-Type": "text/html" });
        res.end();

    }

})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});