// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');


// import object to test
const createCsvParserAsObject = require('../src/csvParserAsObject.js');


suite('ma-csv', function() {

    suite('csvParserAsObject', function() {

        const filePath = './test/data/test_data.csv';

        suite('new()', function() {

            test('should return an Array object', function() {

                const csv = createCsvParserAsObject(filePath).then(value => {
                    assert.instanceOf(csv, Array);
                });
            });

            test('should return first item as an object with headers as properties', function() {

                const csv = createCsvParserAsObject(filePath).then(value => {
                    const expected = 'show_id,type,title,director,cast,country,date_added,release_year,rating,duration,listed_in,description'.split(',');

                    const actual = Object.keys(value[0]);
                    assert.deepEqual(actual, expected, 'headers as properties');

                    const values = ['81145628', 'Movie', 'Norm of the North: King Sized Adventure', '"Richard Finn, Tim Maltby"', '"Alan Marriott, Andrew Toth, Brian Dobson, Cole Howard, Jennifer Cameron, Jonathan Holmes, Lee Tockar, Lisa Durupt, Maya Kay, Michael Dobson"', '"United States, India, South Korea, China"', '"September 9, 2019"', '2019', 'TV-PG', '90 min', '"Children & Family Movies, Comedies"', '"Before planning an awesome wedding for his grandfather, a polar bear king must take back a stolen artifact from an evil archaeologist first."'];
                });
            });

            test('should return first item as an object with proper values', function() {

                const csv = createCsvParserAsObject(filePath).then(value => {

                    const keys = 'show_id,type,title,director,cast,country,date_added,release_year,rating,duration,listed_in,description'.split(',');
                    const values = ['81145628', 'Movie', 'Norm of the North: King Sized Adventure', '"Richard Finn, Tim Maltby"', '"Alan Marriott, Andrew Toth, Brian Dobson, Cole Howard, Jennifer Cameron, Jonathan Holmes, Lee Tockar, Lisa Durupt, Maya Kay, Michael Dobson"', '"United States, India, South Korea, China"', '"September 9, 2019"', '2019', 'TV-PG', '90 min', '"Children & Family Movies, Comedies"', '"Before planning an awesome wedding for his grandfather, a polar bear king must take back a stolen artifact from an evil archaeologist first."'];

                    const expected = {};

                    keys.forEach(function(key, index) {
                        expected[key] = values[index];
                    });

                    const actual = value[0];

                    assert.deepEqual(actual, expected);
                });
            })

        });
    });
})