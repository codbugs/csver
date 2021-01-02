// imports
const { Transform } = require('stream');


// stream definition
module.exports = function() {
    
    let haveBeenHeadersRead = false;

    return new Transform({
        objectMode: true,
        transform(chunk, encode, next) {

            if(haveBeenHeadersRead) {
                this.push(chunk);
            } else {
                haveBeenHeadersRead = true;
            }

            next();
        }
    });
}