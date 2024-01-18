const fs = require('fs');
const path = require('path');

module.exports = {
    read: (fileName) => {
        return fs.readFileSync(path.resolve(__dirname, '../../', fileName), 'utf8');
    },
    write: (fileName, content) => {
        return fs.writeFileSync(path.resolve(__dirname, '../../', fileName), content, {flag: 'w+'});
    }
}