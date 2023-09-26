const fs = require('fs');
const http = require('http');
const dotenv = require('dotenv');
const path = require("path");

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const server = http.createServer((req, res) => {
    const indexFilePath = path.join(__dirname, 'index.html')
    fs.readFile(indexFilePath, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            fs.createReadStream(indexFilePath).pipe(res)
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});