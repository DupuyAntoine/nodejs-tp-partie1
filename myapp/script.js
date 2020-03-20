const fs = require('fs');

var file = process.argv[2];

if (!file) {
    console.error('Missing argument! Example: node script.js FILE_NAME');

    process.exit(1);
}

fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return
    }

    console.log(data);
})