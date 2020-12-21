// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');

// helper libraries
const { Transform } = require('stream');


// import object to test
const csv = require('../src/index.js');


suite('ma-csv', function() {

    suite('csv', function() {

        suite('new()', function() {

            test('should throw error when is different from a string or an object', function() {
                assert.throw(() => new csv(null), TypeError);
                assert.throw(() => new csv(true), TypeError);
                assert.throw(() => new csv(false), TypeError);
                assert.throw(() => new csv(1), TypeError);
                assert.throw(() => new csv(0), TypeError);
                assert.throw(() => new csv(-1), TypeError);
                assert.throw(() => new csv([]), TypeError);
                assert.throw(() => new csv(function() {}, TypeError));
            });

            test('should throw error when empty string is passed', function() {
                assert.throw(() => new csv(''), TypeError);
            });

            test('should return an object when string is passed', function() {
                const parser = new csv('path/to/file');
                assert.instanceOf(parser, Object);
                assert.property(parser, 'asArray');
                assert.property(parser, 'asObject');
                assert.property(parser, 'asStream');
            });

            test('should return an object when configuration object is passed', function() {
                const parser = new csv({
                    filePath: 'path/to/file'
                });
                assert.instanceOf(parser, Object);
                assert.property(parser, 'asArray');
                assert.property(parser, 'asObject');
                assert.property(parser, 'asStream');
            });
        });


        suite('asArray method', function() {

            const filePath = './test/data/test_data.csv';

            test('should return a Promise', function() {
                const parser = new csv(filePath);

                const value = parser.asArray();
                assert.instanceOf(value, Promise);
            });

            test('should return an array when promise is returned', function() {
                const parser = new csv(filePath);

                parser.asArray().then(value => {
                    assert.instanceOf(value, Array);
                });
            });

            test('should return an array with 29 items when promise is returned', function() {
                const expected = 29;
                
                const parser = new csv(filePath);

                parser.asArray().then(value => {
                    assert.deepEqual(value.length, expected);
                });
            });
        });

        
        suite('asObject method', function() {

            const filePath = './test/data/test_data.csv';

            test('should return a Promise', function() {
                const parser = new csv(filePath);

                const value = parser.asArray();
                assert.instanceOf(value, Promise);
            });

            test('should return an array when promise is returned', function() {
                const parser = new csv(filePath);

                parser.asObject().then(value => {
                    assert.instanceOf(value, Array);
                });
            });

            test('should return an array with 29 items when promise is returned', function() {
                const expected = 29;
                
                const parser = new csv(filePath);

                parser.asArray().then(value => {
                    assert.deepEqual(value.length, expected);
                });
            });

            test('should return an array and each item is an object when promise is returned', function() {                
                const parser = new csv(filePath);

                parser.asArray().then(value => {
                    value.forEach(function(item) {
                        assert.isObject(item);
                    });
                });
            });
        });


        suite('asStream method', function() {

            const filePath = './test/data/test_data.csv';

            test('should return a Transform stream', function() {
                const parser = new csv(filePath);

                const value = parser.asStream();
                assert.instanceOf(value, Transform);
            });
        });
    });
});