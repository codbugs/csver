// imports
const _ = require('lodash/core');

const fileHeaderObjectTransformer = require('./fileHeaderObjectTransformer.js');
const headerAvoider = require('./headerAvoider.js');
const optionalHeaderObjectTransformer = require('./optionalHeaderObjectTransformer.js');

// stream definition
module.exports = function(options) {

    const defaults = {
        hasHeaders: true,
        optionalHeaders: []
    };

    // parameters checking
    if(!_.isObject(options)) {
        options = {};
    }

    options = _.extend(defaults, options);

    if(!_.isBoolean(options.hasHeaders)) {
        throw new TypeError('hasHeaders must be a boolean value');
    }

    if(!_.isArray(options.optionalHeaders)) {
        throw new TypeError('optionalHeaders must be an array');
    }


    // check values passed
    if(options.hasHeaders === false && _.isEmpty(options.optionalHeaders)) {
        throw new Error('csv rows cannot be transformed to objects');
    }

    // return the proper transformation stream
    const useFileHeaders = options.hasHeaders && _.isEmpty(options.optionalHeaders);

    return useFileHeaders
        ? new fileHeaderObjectTransformer()
        : new optionalHeaderObjectTransformer(options.optionalHeaders, options.hasHeaders);
}