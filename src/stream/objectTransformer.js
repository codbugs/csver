// imports
const _ = require('lodash/core');
const { Transform } = require('stream');


// stream definition
module.exports = function() {

    let headers = [];

    // return the stream to split data in lines
    return new Transform({
        objectMode: true,
        transform(chunk, encode, next) {
            
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

            this.push(output);
            next();
        }
    });
}