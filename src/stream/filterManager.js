// imports
const _ = require('lodash');
const { Transform } = require('stream');


// stream definition
module.exports = function(filters) {
    
    // parameter checking
    if(!_.isArray(filters)) {
        throw new TypeError('filters must be an array');
    }

    filters.forEach(f => {
        if(!_.isFunction(f)) {
            throw new TypeError('each element in filters array must be a function');
        }
    });


    // module action
    return new Transform({
        objectMode: true,
        transform(chunk, encode, next) {
            if(filters.every(f => {
                try {
                    return f(chunk);
                } catch(err) {
                    return true;
                }
            })){
                this.push(chunk);
            }
            
            next();
        }
    });
}