// imports
const _ = require('lodash/core');
const { Writable } = require('stream');
const csvParserAsStream = require('./stream.js');


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
    
    let headers = [];
    const collection = [];

    const stream = new Writable({
        objectMode: true,
        write(chunk, encode, next) {
            
            // set the header fields the first chunk received
            if(_.isEmpty(headers)) {
                headers = chunk;
                next();
                return;
            }

            // object creation from headers
            let output = {};
            headers.forEach(function(header, index) {
                output[header] = chunk[index];
            });

            collection.push(output);
            next();
        }
    });

    return new Promise(function(resolve, reject) {
        csvParserAsStream(path)
            .pipe(stream)
            .on('finish', function() {
                resolve(collection);       
            });
    });
}