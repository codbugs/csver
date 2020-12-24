// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');

// import auxiliar libraries
const { Readable, Transform, Writable } = require('stream');

// import object to test
const objectTransformer = require('../../src/stream/objectTransformer.js');


suite('csver', function() {

    suite('stream', function() {

        suite('objectTransformer', function() {

            const filePath = './test/data/test_data.csv';

            suite('new()', function() {

                test('should return a Transform object', function() {
                    const actual = new objectTransformer();

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

                test('should return objects with properties as the headers', function() {
                    const headersExpected = ['animal', 'legs'];

                    pushTextStream('animal,legs\r\nbird,2\r\ncat,4')
                        .pipe(new objectTransformer())
                        .pipe(new Writable({
                            objectMode: true,
                            write(obj, encoding, next) {
                                const actualHeaders = Object.entries(obj);
                                assert.deepEqual(actualHeaders, headersExpected);

                                next();
                            }
                        }))
                });

                test('should return objects with proper content', function() {
                    const itemsExpected = [
                        { animal: 'bird', legs: 2 },
                        { animal: 'cat', legs: 4 },
                    ];
                    const pipeIndex = 0;

                    pushTextStream('animal,legs\r\nbird,2\r\ncat,4')
                        .pipe(new objectTransformer())
                        .pipe(new Writable({
                            objectMode: true,
                            write(obj, encoding, next) {
                                assert.deepEqual(obj, itemsExpected[pipeIndex]);

                                pipeIndex += 1;
                                next();
                            }
                        }))
                });

            });
        });
    });
});