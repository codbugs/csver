const createConfiguration = require('./configuration.js');
const parseAsArray = require('./parser/stream.js');
const headerAvoider = require('./stream/headerAvoider.js');
const objectTransformer = require('./stream/objectTransformer.js');

module.exports = function(options) {

    const configuration = createConfiguration(options);
    
    return {
        asArray() {
            const data = parseAsArray(configuration);

            return configuration.hasHeaders 
                ? data.pipe(new headerAvoider()) 
                : data;
        },

        asObject() {
            const data = parseAsArray(configuration);
            
            return data.pipe(new objectTransformer());
        },
    };
};