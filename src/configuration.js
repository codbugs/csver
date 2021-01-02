// imports
const _ = require('lodash/core');


module.exports = function(options) {

    const defaults = {
        // (optional) character to split each column of the csv file, comma by default
        columnSplitter: ',',

        // (optional) characters to split each line of the csv file, carriage return and line feed by default
        lineSplitter: '\r\n', 

        // (required) relative or absoulte path to the csv file
        filePath: null, // 

        // (optional) set if csv file has headers, true by default
        hasHeaders: true,

        // (optional) set header names for each column
        headers: []
    };

    // initialize input parameters with the default options in case of being an object
    if(_.isObject(options)) {
        options = _.extend(defaults, options);
    }

    // initialize filePath with the default options in case of being a string
    if(_.isString(options)) {
        options = _.extend(defaults, { filePath: options });
    }

    // parameters checking
    if(!_.isString(options.columnSplitter)) {
        throw new TypeError('columnSplitter must be a string');
    }

    if(!_.isString(options.lineSplitter)) {
        throw new TypeError('lineSplitter must be a string');
    }

    if(_.isEmpty(options.filePath)) {
        throw new TypeError('filePath must be defined');
    }

    if(!_.isBoolean(options.hasHeaders)) {
        throw new TypeError('hasHeaders must be true or false');
    }

    if(!_.isArray(options.headers)) {
        throw new TypeError('headers must be an array');
    }

    return options;
};