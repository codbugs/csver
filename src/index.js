// imports
const _ = require('lodash/core');
const fs = require('fs');
const { Transform } = require('stream');


// helper streams
function createLineSplitterStream(splitter) {

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
    splitter = splitter || '\r\n';


    // return the stream to split data in lines
    return new Transform({
        transform(chunk, encode, next) {
            const content = chunk.toString();
            const that = this;
            content.split(splitter).forEach(function(item) {
                that.push(item);
            });
            next();
        }
    });
}

// csv parser


// export csv parser

module.exports = {
    createLineSplitterStream: createLineSplitterStream
};