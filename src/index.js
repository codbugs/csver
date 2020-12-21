const createConfiguration = require('./configuration.js');
const parseAsArray = require('./parser/array.js');
const parseAsObject = require('./parser/object.js');
const parseAsStream = require('./parser/stream.js');

module.exports = function(options) {

    const configuration = createConfiguration(options);
    
    return {
        async asArray() {
            return parseAsArray(configuration.filePath);
        },

        async asObject() {
            return parseAsObject(configuration.filePath);
        },

        asStream() {
            return parseAsStream(configuration.filePath);
        },
    };
};