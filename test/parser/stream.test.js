// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');

// import auxiliar libraries
const { Transform } = require('stream');

// import object to test
const createCsvParserStream = require('../../src/parser/stream.js');


suite('ma-csv', function() {

    suite('csvParserStream', function() {

        const filePath = './test/data/test_data.csv';

        suite('new()', function() {

            test('should throw error when passing a parameter different from a string', function() {
                assert.throw(() => new createCsvParserStream(), TypeError);
                assert.throw(() => new createCsvParserStream(null), TypeError);
                assert.throw(() => new createCsvParserStream(true), TypeError);
                assert.throw(() => new createCsvParserStream(false), TypeError);
                assert.throw(() => new createCsvParserStream(1), TypeError);
                assert.throw(() => new createCsvParserStream(0), TypeError);
                assert.throw(() => new createCsvParserStream(-1), TypeError);
                assert.throw(() => new createCsvParserStream([]), TypeError);
                assert.throw(() => new createCsvParserStream({}), TypeError);
                assert.throw(() => new createCsvParserStream(function() {}), TypeError);
            });

            test('should throw error when passing an empty string', function() {
                assert.throw(() => new createCsvParserStream(''), TypeError);
            });

            test('should return a Trasform stream', function() {

                const csv = createCsvParserStream(filePath);

                assert.instanceOf(csv, Transform);
            })

        });
    });
})