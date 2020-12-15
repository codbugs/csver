// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');

// import auxiliar libraries
const { Readable, Transform, Writable } = require('stream');

// import object to test
const { createLineSplitterStream } = require('../src/index.js');
const { create } = require('lodash');

suite('ms-csv', function() {

    suite('createLineSplitterStream', function() {

        suite('new()', function() {

            test('should throw error when passing a parameter different from a string', function() {
                assert.throw(() => new createLineSplitterStream(null), TypeError);
                assert.throw(() => new createLineSplitterStream(true), TypeError);
                assert.throw(() => new createLineSplitterStream(false), TypeError);
                assert.throw(() => new createLineSplitterStream(1), TypeError);
                assert.throw(() => new createLineSplitterStream(0), TypeError);
                assert.throw(() => new createLineSplitterStream(-1), TypeError);
                assert.throw(() => new createLineSplitterStream([]), TypeError);
                assert.throw(() => new createLineSplitterStream({}), TypeError);
                assert.throw(() => new createLineSplitterStream(function() {}), TypeError);
            });

            test('should throw error when passing an empty string', function() {
                assert.throw(() => new createLineSplitterStream(''), TypeError);
            });


            test('should return a Transform object when not passing parameter', function() {
                const actual = new createLineSplitterStream();

                assert.instanceOf(actual, Transform);
            });

            test('should return a Transform object when passing a string', function() {
                const actual = new createLineSplitterStream('\n');

                assert.instanceOf(actual, Transform);
            });

        });


        suite('pipe()', function() {

            const saveToArrayStream = function() {

                const that = {
                    value: [],
                    writable: new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            that.value.push(chunk.toString());
                            next();
                        }
                    })
                };
                
                return that;
            }

            test('should return empty array when passing empty stream', function() {
                const expected = [];
                
                const target = createLineSplitterStream();
                const stream = new saveToArrayStream();
                Readable.from(''.split(''))
                    .pipe(target)
                    .pipe(stream.writable)
                    .on('finish', function() {
                        let actual = stream.value;
                        assert.deepEqual(actual, expected);
                    });

            });

            test('should return an array with two values when stream passed contains two values', function() {
                const expected = ['1', '2'];
                
                const target = createLineSplitterStream(',');
                const stream = new saveToArrayStream();
                Readable.from('1,2'.split(''))
                    .pipe(target)
                    .pipe(stream.writable)
                    .on('finish', function() {
                        let actual = stream.value;
                        assert.deepEqual(actual, expected);
                    });

            });
        });

    });
})