const createConfiguration = require('./configuration.js');
const parseAsArray = require('./parser/stream.js');
const objectTransformer = require('./stream/objectTransformer.js');

module.exports = function(options) {

    const configuration = createConfiguration(options);
    
    return {
        asArray() {
            return parseAsArray(configuration.filePath);
        },

        asObject() {
            return parseAsArray(configuration.filePath)
                .pipe(objectTransformer());
        },
    };
};