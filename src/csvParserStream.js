// imports
const _ = require('lodash/core');
const fs = require('fs');
const createLineSplitter = require('./lineSplitterStream.js');
const createColumnSplitter = require('./columnSplitterStream.js');


// stream definition
module.exports = function(path) {

    return fs.createReadStream(path)
        .pipe(createLineSplitter())
        .pipe(createColumnSplitter());
}