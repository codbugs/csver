// imports
const { Transform } = require('stream');


// stream definition
module.exports = function(headers, ignoreFileHeaders) {
    
    let haveBeenIgnoredFileHeaders = false;

    return new Transform({
        objectMode: true,
        transform(chunk, encode, next) {
            if(ignoreFileHeaders && haveBeenIgnoredFileHeaders === false) {
                haveBeenIgnoredFileHeaders = true;
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