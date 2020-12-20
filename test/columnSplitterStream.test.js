// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');

// import auxiliar libraries
const { Readable, Transform, Writable } = require('stream');

// import object to test
const createColumnSplitterStream = require('../src/columnSplitterStream.js');


suite('ma-csv', function() {

    suite('columnSplitterStream', function() {

        suite('new()', function() {

            test('should return a Transform object when not passing parameter', function() {
                const actual = new createColumnSplitterStream();

                assert.instanceOf(actual, Transform);
            });

        });


        suite('pipe()', function() {

            const pushTextStream = function(text) {
                return new Readable({
                    read(size) {
                        this.push(text);
                        this.push(null);
                    }
                });
            }

            const saveResult = function() {

                const that = {
                    value: null,
                    writable: new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            that.value = chunk;
                            next();
                        }
                    })
                };
                
                return that;
            }

            test('should return a null value when passing empty stream', function() {
                const expected = null;
                
                const target = createColumnSplitterStream();
                const stream = new saveResult();
                pushTextStream('')
                    .pipe(target)
                    .pipe(stream.writable)
                    .on('finish', function() {
                        let actual = stream.value;
                        console.log('>>> actual is ', actual);
                        assert.deepEqual(actual, expected);
                    });
            });

            test('should return an array when passing data stream', function() {
                const target = createColumnSplitterStream();
                const stream = new saveResult();
                pushTextStream('abc')
                    .pipe(target)
                    .pipe(stream.writable)
                    .on('finish', function() {
                        let actual = stream.value;
                        assert.instanceOf(actual, Array);
                    });
            });

            test('should return an array with first item as "abc" when passing "abc"', function() {
                const expected = ["abc"];

                const target = createColumnSplitterStream();
                const stream = new saveResult();
                
                pushTextStream('abc')
                    .pipe(target)
                    .pipe(stream.writable)
                    .on('finish', function() {
                        let actual = stream.value;
                        assert.deepEqual(actual.length, expected.length);
                        assert.deepEqual(actual[0], expected[0]);
                    });
            });


            test('should return an array with two items when passing "abc,def"', function() {
                const expected = ["abc", "def"];

                const target = createColumnSplitterStream();
                const stream = new saveResult();
                
                pushTextStream('abc,def')
                    .pipe(target)
                    .pipe(stream.writable)
                    .on('finish', function() {
                        let actual = stream.value;
                        assert.deepEqual(actual.length, expected.length, 'array size');
                        assert.deepEqual(actual[0], expected[0], 'first item');
                        assert.deepEqual(actual[1], expected[1], 'second item');
                    });
            });

        });

    });
})