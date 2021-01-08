const createConfiguration = require('./configuration.js');
const parseAsArray = require('./parser/stream.js');
const headerAvoider = require('./stream/headerAvoider.js');
const objectTransformer = require('./stream/objectTransformer.js');
const filterManager = require('./stream/filterManager.js');

module.exports = function(options) {

    const configuration = createConfiguration(options);
    
    return {
        asArray() {
            const data = parseAsArray(configuration);

            return (configuration.hasHeaders 
                    ? data.pipe(new headerAvoider()) 
                    : data)
                .pipe(new filterManager(configuration.filters));
        },

        asObject() {
            const data = parseAsArray(configuration);

            return data.pipe(new objectTransformer({
                    hasHeaders: configuration.hasHeaders, 
                    optionalHeaders: configuration.headers
                }))
                .pipe(new filterManager(configuration.filters));
        },
    };
};