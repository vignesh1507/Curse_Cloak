const path = require('path');

module.exports = {
    mode: 'production',
    entry: './contentScript.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'contentScript.bundle.js'
    }
};
