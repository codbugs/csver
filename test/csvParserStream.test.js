// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');

// import auxiliar libraries
const { Transform } = require('stream');

// import object to test
const createCsvParserStream = require('../src/csvParserStream.js');


suite('ma-csv', function() {

    suite('csvParserStream', function() {

        const filePath = './test/data/test_data.csv';

        suite('new()', function() {

            test('should return a Trasform stream', function() {

                const csv = createCsvParserStream(filePath);

                assert.instanceOf(csv, Transform);
            })

        });
    });
})