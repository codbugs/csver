// imports
const _ = require('lodash/core');
const { Transform } = require('stream');


// stream definition
module.exports = function() {

    const expression = new RegExp('([^,]*(,|$))', 'gi');

    // return the stream to split data in lines
    return new Transform({
        objectMode: true,
        transform(chunk, encode, next) {
            const content = chunk.toString();

            let matches = content.match(expression);
            
            matches.pop(); // last item is always an empty string because of the regular expression

            matches = matches.map(i => i.endsWith(',') ? i.slice(0, i.length-1) : i);

            this.push(matches);
            next();
        }
    });
}