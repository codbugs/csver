// imports
const _ = require('lodash/core');
const fs = require('fs');
const createLineSplitter = require('./lineSplitterStream.js');
const createColumnSplitter = require('./columnSplitterStream.js');


// stream definition
module.exports = function(path) {

    // check parameter value
    if(!_.isUndefined(path)) {
        if(!_.isString(path)) {
            throw new TypeError('path parameter must be a string');
        }

        if(_.isEmpty(path)) {
            throw new TypeError('path parameter must not be an empty string');
        }
    }
        
    return fs.createReadStream(path)
        .pipe(createLineSplitter())
        .pipe(createColumnSplitter());
}