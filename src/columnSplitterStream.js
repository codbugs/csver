// imports
const _ = require('lodash/core');
const { Transform } = require('stream');


// stream definition
module.exports = function(splitter) {

    // check parameter value
    if(!_.isUndefined(splitter)) {
        if(!_.isString(splitter)) {
            throw new TypeError('splitter parameter must be a string');
        }

        if(_.isEmpty(splitter)) {
            throw new TypeError('splitter parameter must not be an empty string');
        }
    }

    // set default parameter value if not passed
    splitter = splitter || ',';

    const expression = new RegExp(`([^${splitter}]*(${splitter}|$))`, 'gi');

    // return the stream to split data in lines
    return new Transform({
        objectMode: true,
        transform(chunk, encode, next) {
            const content = chunk.toString();

            let matches = content.match(expression);
            
            matches.pop(); // last item is always an empty string because of the regular expression

            matches = matches.map(i => i.endsWith(splitter) ? i.slice(0, i.length-1) : i);

            this.push(matches);
            next();
        }
    });
}