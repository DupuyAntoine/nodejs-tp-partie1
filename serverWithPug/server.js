const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(
    (req, res) => {
        let lines;
        fs.readFile('./data.csv', 'utf-8', async (err, data)=> {
            if (err) {
                console.error(err);
                return
            }
            lines = data.toString().split(/\r\n|\n/);
            let content = '<table>';
            for (let line of lines) {
                elts = line.split(';');
                content += `<tr><td>${elts[0]}</td><td>${elts[1]}</td></tr>`
            }
            content += '<style type="text/css">td { border-bottom: 1px solid #ddd; }</style>'
            content += '</table>';
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(content);    
        });
    }
);

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
})