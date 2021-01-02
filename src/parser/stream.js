// imports
const _ = require('lodash/core');
const fs = require('fs');
const createLineSplitter = require('../stream/lineSplitter.js');
const createColumnSplitter = require('../stream/columnSplitter.js');


// stream definition
module.exports = function(options) {

    const path = options.filePath;
    const columnSplitter = options.columnSplitter;
    const lineSplitter = options.lineSplitter;

    // check parameter value
    if(!_.isObject(options)) {
        throw new TypeError('options parameter must be an object');
    }
        
    return fs.createReadStream(path)
        .pipe(createLineSplitter(lineSplitter))
        .pipe(createColumnSplitter(columnSplitter));
}