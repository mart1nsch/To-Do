const fs = require('fs');

console.log(fs.readFileSync('./dados.json', 'utf8', (err, data) => {
    console.log(data);
}));