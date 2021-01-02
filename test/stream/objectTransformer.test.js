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

            suite('new()', function() {

                test('should return a Transform object when no parameters passed', function() {
                    const actual = new objectTransformer();

                    assert.instanceOf(actual, Transform);
                });

                test('should throw an error when hasHeaders parameter is not a boolean value', function() {
                    assert.throw(() => {
                        const actual = new objectTransformer({
                            hasHeaders: null,
                            optionalHeaders: []
                        });
                    }, Error);
                });

                test('should throw an error when optinalHeaders parameter is not an array', function() {
                    assert.throw(() => {
                        const actual = new objectTransformer({
                            hasHeaders: true,
                            optionalHeaders: 1
                        });
                    }, Error);
                });

                test('should throw an error when file has no headers and want to use them', function() {
                    assert.throw(() => {
                        const actual = new objectTransformer({
                            hasHeaders: false,
                            optionalHeaders: []
                        });
                    }, Error);
                });

                test('should return a Transform object when file has headers and want to use them', function() {
                    const actual = new objectTransformer({
                        hasHeaders: true,
                        optionalHeaders: []
                    });

                    assert.instanceOf(actual, Transform);
                });

                test('should return a Transform object when file has headers and want to use optional headers', function() {
                    const actual = new objectTransformer({
                        hasHeaders: true,
                        optionalHeaders: ['id', 'title', 'description']
                    });

                    assert.instanceOf(actual, Transform);
                });

                test('should return a Transform object when file has no header and want to use optional headers', function() {
                    const actual = new objectTransformer({
                        hasHeaders: false,
                        optionalHeaders: ['id', 'title', 'description']
                    });

                    assert.instanceOf(actual, Transform);
                });

            });

            suite('pipe()', function() {
                
                const pushTextStream = function(text) {
                    return new Readable({
                        objectMode: true,
                        read(size) {
                            text.split('\r\n').forEach(item => {
                                this.push(item.split(','));
                            })
                            this.push(null);
                        }
                    });
                }

                suite('using file headers', function() {

                    test('should return objects with properties as the headers', function() {
                        const headersExpected = ['animal', 'legs'];
    
                        pushTextStream('animal,legs\r\nbird,2\r\ncat,4')
                            .pipe(new objectTransformer())
                            .pipe(new Writable({
                                objectMode: true,
                                write(obj, encoding, next) {
                                    let actualHeaders = Object.keys(obj);
                                    assert.deepEqual(actualHeaders, headersExpected);
    
                                    next();
                                }
                            }))
                    });
    
                    test('should return objects with proper content', function() {
                        const itemsExpected = [
                            { animal: 'bird', legs: '2' },
                            { animal: 'cat', legs: '4' },
                        ];
                        let pipeIndex = 0;
    
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

                suite('using optional headers when file has headers', function() {
                    
                    test('should return objects with properties as the headers', function() {
                        const headersExpected = ['type', 'feet'];
    
                        pushTextStream('animal,legs\r\nbird,2\r\ncat,4')
                            .pipe(new objectTransformer({
                                hasHeaders: true,
                                optionalHeaders: headersExpected
                            }))
                            .pipe(new Writable({
                                objectMode: true,
                                write(obj, encoding, next) {
                                    const actualHeaders = Object.keys(obj);
                                    assert.deepEqual(actualHeaders, headersExpected);
    
                                    next();
                                }
                            }))
                    });
    
                    test('should return objects with proper content', function() {
                        const itemsExpected = [
                            { type: 'bird', feet: '2' },
                            { type: 'cat', feet: '4' },
                        ];
                        let pipeIndex = 0;
    
                        pushTextStream('animal,legs\r\nbird,2\r\ncat,4')
                            .pipe(new objectTransformer({
                                hasHeaders: true,
                                optionalHeaders: ['type', 'feet']
                            }))
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

                suite('using optional headers when file has no headers', function() {
                    
                    test('should return objects with properties as the headers', function() {
                        const headersExpected = ['type', 'feet'];
    
                        pushTextStream('bird,2\r\ncat,4')
                            .pipe(new objectTransformer({
                                hasHeaders: false,
                                optionalHeaders: headersExpected
                            }))
                            .pipe(new Writable({
                                objectMode: true,
                                write(obj, encoding, next) {
                                    const actualHeaders = Object.keys(obj);
                                    assert.deepEqual(actualHeaders, headersExpected);
    
                                    next();
                                }
                            }))
                    });
    
                    test('should return objects with proper content', function() {
                        const itemsExpected = [
                            { type: 'bird', feet: '2' },
                            { type: 'cat', feet: '4' },
                        ];
                        let pipeIndex = 0;
    
                        pushTextStream('bird,2\r\ncat,4')
                            .pipe(new objectTransformer({
                                hasHeaders: false,
                                optionalHeaders: ['type', 'feet']
                            }))
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
});