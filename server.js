const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 9000;

http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data){
        if(err){
            res.statusCode = 500;
            res.end(`Error getting index.html`);
        } else {
            res.setHeader('Content-type', 'text/html');
            res.end(data);
        }
    });
}).listen(parseInt(port));

console.log(`Avoid blue! running on localhost:${port}`);