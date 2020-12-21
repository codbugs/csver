// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');

// import auxiliar libraries
const { Readable, Transform, Writable } = require('stream');

// import object to test
const createCsvParserAsArray = require('../../src/parser/array.js');


suite('ma-csv', function() {

    suite('csvParserAsArray', function() {

        const filePath = './test/data/test_data.csv';

        suite('new()', function() {

            test('should throw error when passing a parameter different from a string', function() {
                assert.throw(() => new createCsvParserAsArray(null), TypeError);
                assert.throw(() => new createCsvParserAsArray(true), TypeError);
                assert.throw(() => new createCsvParserAsArray(false), TypeError);
                assert.throw(() => new createCsvParserAsArray(1), TypeError);
                assert.throw(() => new createCsvParserAsArray(0), TypeError);
                assert.throw(() => new createCsvParserAsArray(-1), TypeError);
                assert.throw(() => new createCsvParserAsArray([]), TypeError);
                assert.throw(() => new createCsvParserAsArray({}), TypeError);
                assert.throw(() => new createCsvParserAsArray(function() {}), TypeError);
            });

            test('should throw error when passing an empty string', function() {
                assert.throw(() => new createCsvParserAsArray(''), TypeError);
            });

            test('should return an Array object', function() {

                const csv = createCsvParserAsArray(filePath).then(value => {
                    assert.instanceOf(csv, Array);
                });
            });

            test('should return headers as first item', function() {

                const csv = createCsvParserAsArray(filePath).then(value => {
                    const headers = 'show_id,type,title,director,cast,country,date_added,release_year,rating,duration,listed_in,description'.split(',');

                    const firstItem = ['81145628', 'Movie', 'Norm of the North: King Sized Adventure', '"Richard Finn, Tim Maltby"', '"Alan Marriott, Andrew Toth, Brian Dobson, Cole Howard, Jennifer Cameron, Jonathan Holmes, Lee Tockar, Lisa Durupt, Maya Kay, Michael Dobson"', '"United States, India, South Korea, China"', '"September 9, 2019"', '2019', 'TV-PG', '90 min', '"Children & Family Movies, Comedies"', '"Before planning an awesome wedding for his grandfather, a polar bear king must take back a stolen artifact from an evil archaeologist first."'];

                    assert.deepEqual(value[0], headers);
                    assert.deepEqual(value[1], firstItem);
                });
            })

        });
    });
})