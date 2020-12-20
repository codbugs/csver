// imports
const _ = require('lodash/core');
const fs = require('fs');
const { Writable } = require('stream');
const createLineSplitter = require('./lineSplitterStream.js');
const createColumnSplitter = require('./columnSplitterStream.js');


// stream definition
module.exports = function() {

    const collection = [];

    const stream = new Writable({
        objectMode: true,
        write(chunk, encode, next) {
            collection.push(chunk);
            next();
        }
    });

    return new Promise(function(resolve, reject) {
        fs.createReadStream(path)
            .pipe(createLineSplitter())
            .pipe(createColumnSplitter())
            .pipe(stream)
            .on('finish', function() {
                resolve(collection);       
            })
    });
}