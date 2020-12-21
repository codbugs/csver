// imports
const _ = require('lodash/core');
const { Writable } = require('stream');
const csvParserAsStream = require('./csvParserStream.js');


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
    
    const collection = [];

    const stream = new Writable({
        objectMode: true,
        write(chunk, encode, next) {
            collection.push(chunk);
            next();
        }
    });

    return new Promise(function(resolve, reject) {
        csvParserAsStream(path)
            .pipe(stream)
            .on('finish', function() {
                resolve(collection);       
            })
    });
}