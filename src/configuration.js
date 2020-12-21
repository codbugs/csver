// imports
const _ = require('lodash/core');


module.exports = function(options) {

    const defaults = {
        // core options
        columnSplitter: ',',
        lineSplitter: '\r\n',

        // data source options
        filePath: null,

        // returned data options
        // headers: [],
    };

    options = _.extend(defaults, options);

    if(!_.isString(options.columnSplitter)) {
        throw new TypeError('columnSplitter must be a string');
    }

    if(!_.isString(options.lineSplitter)) {
        throw new TypeError('lineSplitter must be a string');
    }

    if(_.isEmpty(options.filePath)) {
        throw new TypeError('filePath must be defined');
    }

    return options;
};