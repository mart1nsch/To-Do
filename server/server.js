const http = require('http');
const url = require(`url`);
const fs = require(`fs`);

const port = 3001;

const server = http.createServer((req, res) => {

    const q = url.parse(req.url, true);
    const fileName = q.pathname.substring(1);

    if (!fileName) { // Página de Login

        fs.readFile('../public/login/html/login.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });

    } else if (fileName.includes('home')) { // Página Home

        fs.readFile('../public/home/html/home.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });

    } else if (fileName.includes('.css')) { // Arquivos CSS
        
        fs.readFile(`../${fileName}`, (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(data);
            return res.end();
        });

    } else if (fileName.includes('.js')) { // Arquivos JS
        
        fs.readFile(`../${fileName}`, (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            return res.end();
        });

    } else if (fileName.includes('.png')) { // Arquivos PNG
        
        fs.readFile(`../${fileName}`, (err, data) => {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.write(data);
            return res.end();
        });

    } else if (fileName.includes('createAccount')) { // Cria conta

        const { username, password } = q.query;

        if (fs.existsSync(`./data/${username}.json`)) {
            res.writeHead(208, { 'Content-Type': 'text/json' });
            return res.end();
        }

        fs.writeFileSync(`./data/${username}.json`, `{ "password": "${password}" }`);

        res.writeHead(201, { 'Content-Type': 'text/json' });
        return res.end();

    } else if (fileName.includes('enterAccount')) { // Acessa a conta

        const { username, password } = q.query;
        
        if (!fs.existsSync(`./data/${username}.json`)) {
            res.writeHead(200, { 'Content-Type': 'text/json' });
            return res.end();
        }

        fs.readFile(`./data/${username}.json`, (err, data) => {

            const realPassword = JSON.parse(data).password;

            if (realPassword === password) {

                res.writeHead(202, { 'Content-Type': 'text/json' });
                return res.end();

            } else {

                res.writeHead(200, { 'Content-Type': 'text/json' });
                return res.end();

            }

        });

    } else {
        
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end();

    }

});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});