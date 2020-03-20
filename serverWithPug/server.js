const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(
    (req, res) => {
        console.log(req.url)
        fs.readFile('.\/' + req.url, 'utf-8', async (err, data)=> {
            if (err) {
                console.error(err);
                return
            }

            const content = createHtmlContent(data)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(content);    
        });
    }
);

const createHtmlContent = (data) => {
    let lines = data.toString().split(/\r\n|\n/);
    let content = '<table>';
    content += '<thead>';
    content += '<tr><th>Identifiant</th><th>Ville</th></tr>';
    content += '</thead>';
    content += '<tbody>';
    for (let line of lines) {
        elts = line.split(';');
        content += `<tr><td>${elts[0]}</td><td>${elts[1]}</td></tr>`;
    }
    content += '</tbody>';
    content += '<style type="text/css">';
    content += 'table { border: 1px solid #ddd; width: 100%; }';
    content += 'th { background-color: cyan; }';
    content += '</style>';
    content += '</table>';
    return content;
}

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
})
