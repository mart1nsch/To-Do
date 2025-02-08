const http = require('http');
const fs = require(`fs`);

const port = 3100;

const server = http.createServer((req, res) => {
    const q = require(`url`).parse(req.url, true);
    
    let fileName = q.pathname.substring(1);
    let contentType = ``;
    
    if (fileName.includes(`html`)) {
        fileName = `../html/${fileName}`;
        contentType = `text/html`;
    } else if (fileName.includes(`css`)) {
        fileName = `../css/${fileName}`;
        contentType = `text/css`;
    } else if (fileName.includes(`js`)) {
        fileName = `../js/${fileName}`;
        contentType = `text/javascript`;
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write(`Arquivo nao encontrado`);
        return res.end();
    }

    fs.readFile(fileName, (err, data) => {
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        return res.end();
    })
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})