// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');

// helper libraries
const { Writable } = require('stream');


// import object to test
const csver = require('../src/index.js');


suite('csver', function() {

    suite('main', function() {

        suite('new()', function() {

            test('should throw error when is different from a string or an object', function() {
                assert.throw(() => new csver(null), TypeError);
                assert.throw(() => new csver(true), TypeError);
                assert.throw(() => new csver(false), TypeError);
                assert.throw(() => new csver(1), TypeError);
                assert.throw(() => new csver(0), TypeError);
                assert.throw(() => new csver(-1), TypeError);
                assert.throw(() => new csver([]), TypeError);
                assert.throw(() => new csver(function() {}, TypeError));
            });

            test('should throw error when empty string is passed', function() {
                assert.throw(() => new csver(''), TypeError);
            });

            test('should return an object with "asArray" method when string is passed', function() {
                const parser = new csver('path/to/file');
                assert.instanceOf(parser, Object);
                assert.property(parser, 'asArray');
            });

            test('should return an object with "asObject" method when string is passed', function() {
                const parser = new csver('path/to/file');
                assert.instanceOf(parser, Object);
                assert.property(parser, 'asObject');
            });

            test('should return an object with "asArray" method when configuration object is passed', function() {
                const parser = new csver({
                    filePath: 'path/to/file'
                });
                assert.instanceOf(parser, Object);
                assert.property(parser, 'asArray');
            });

            test('should return an object with "asObject" method when configuration object is passed', function() {
                const parser = new csver({
                    filePath: 'path/to/file'
                });
                assert.instanceOf(parser, Object);
                assert.property(parser, 'asObject');
            });
        });


        suite('asArray method', function() {

            const filePath = './test/data/test_data.csv';

            test('should return an array per each chunk', function() {
                const parser = new csver(filePath);

                parser.asArray().pipe(new Writable({
                    objectMode: true,
                    write(chunk, encoding, next) {
                        assert.instanceOf(chunk, Array);
                        next();
                    }
                }));
                    
            });

            test('should return 30 items when hasHeaders has been passed as false', function() {
                const expected = 30;
                let actual = 0;
                
                const parser = new csver({
                    filePath: filePath,
                    hasHeaders: false
                });

                parser.asArray().pipe(new Writable({
                    objectMode: true,
                    write(chunk, encoding, next) {
                        actual++;
                        next();
                    }
                }))
                .on('finish', function() {
                    assert.deepEqual(actual, expected);
                });
            });

            test('should return 29 items when hasHeaders has been passed as true', function() {
                const expected = 29;
                let actual = 0;
                
                const parser = new csver({
                    filePath: filePath,
                    hasHeaders: true
                });

                parser.asArray().pipe(new Writable({
                    objectMode: true,
                    write(chunk, encoding, next) {
                        actual++;
                        next();
                    }
                }))
                .on('finish', function() {
                    assert.deepEqual(actual, expected);
                });
            });
        });

        
        suite('asObject method', function() {

            const filePath = './test/data/test_data.csv';
            const filePathWithoutHeaders = './test/data/test_data_without_headers.csv';

            test('should return an Object per each chunk', function() {
                const parser = new csver(filePath);

                parser.asObject().pipe(new Writable({
                    objectMode: true,
                    write(chunk, encoding, next) {
                        assert.instanceOf(chunk, Object);
                        next();
                    }
                }));
                    
            });

            test('should return 29 items', function() {
                const expected = 29;
                let actual = 0;
                
                const parser = new csver(filePath);

                parser.asObject().pipe(new Writable({
                    objectMode: true,
                    write(chunk, encoding, next) {
                        actual++;
                        next();
                    }
                }))
                .on('finish', function() {
                    assert.deepEqual(actual, expected); 
                });
            });

            suite('first item values', function() {

                test('should return 81145628 as show_id field for the first item', function(done) {
                    const expected = '81145628';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['show_id'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected, 'show ids are different');
                        done();
                    });
                });
    
                test('should return Movie as type field for the first item', function(done) {
                    const expected = 'Movie';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['type'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "Norm of the North: King Sized Adventure" as title field for the first item', function(done) {
                    const expected = 'Norm of the North: King Sized Adventure';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['title'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected); 
                        done();
                    });
                });
    
                test('should return "Richard Finn, Tim Maltby" as director field for the first item', function(done) {
                    const expected = '"Richard Finn, Tim Maltby"';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['director'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "Alan Marriott, Andrew Toth, Brian Dobson, Cole Howard, Jennifer Cameron, Jonathan Holmes, Lee Tockar, Lisa Durupt, Maya Kay, Michael Dobson" as cast field for the first item', function(done) {
                    const expected = '"Alan Marriott, Andrew Toth, Brian Dobson, Cole Howard, Jennifer Cameron, Jonathan Holmes, Lee Tockar, Lisa Durupt, Maya Kay, Michael Dobson"';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['cast'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "United States, India, South Korea, China" as country field for the first item', function(done) {
                    const expected = '"United States, India, South Korea, China"';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['country'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
            });

            suite('first item values with custom field headers', function() {

                test('should return 81145628 as id field for the first item', function(done) {
                    const expected = '81145628';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver({
                        filePath: filePath,
                        hasHeaders: true,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['id'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected, 'ids are different');
                        done();
                    });
                });
    
                test('should return Movie as type field for the first item', function(done) {
                    const expected = 'Movie';
                    let counter = 0;
                    let actual = '';

                    const parser = new csver({
                        filePath: filePath,
                        hasHeaders: true,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['type'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "Norm of the North: King Sized Adventure" as title field for the first item', function(done) {
                    const expected = 'Norm of the North: King Sized Adventure';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver({
                        filePath: filePath,
                        hasHeaders: true,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['title'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected); 
                        done();
                    });
                });
    
                test('should return "Richard Finn, Tim Maltby" as director field for the first item', function(done) {
                    const expected = '"Richard Finn, Tim Maltby"';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver({
                        filePath: filePath,
                        hasHeaders: true,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['director'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "Alan Marriott, Andrew Toth, Brian Dobson, Cole Howard, Jennifer Cameron, Jonathan Holmes, Lee Tockar, Lisa Durupt, Maya Kay, Michael Dobson" as cast field for the first item', function(done) {
                    const expected = '"Alan Marriott, Andrew Toth, Brian Dobson, Cole Howard, Jennifer Cameron, Jonathan Holmes, Lee Tockar, Lisa Durupt, Maya Kay, Michael Dobson"';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver({
                        filePath: filePath,
                        hasHeaders: true,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['cast'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "United States, India, South Korea, China" as country field for the first item', function(done) {
                    const expected = '"United States, India, South Korea, China"';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver({
                        filePath: filePath,
                        hasHeaders: true,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['countries'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
            });

            suite('first item values with custom field headers with a file whithout headers', function() {

                test('should return 81145628 as id field for the first item', function(done) {
                    const expected = '81145628';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver({
                        filePath: filePathWithoutHeaders,
                        hasHeaders: false,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['id'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected, 'ids are different');
                        done();
                    });
                });
    
                test('should return Movie as type field for the first item', function(done) {
                    const expected = 'Movie';
                    let counter = 0;
                    let actual = '';

                    const parser = new csver({
                        filePath: filePathWithoutHeaders,
                        hasHeaders: false,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['type'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "Norm of the North: King Sized Adventure" as title field for the first item', function(done) {
                    const expected = 'Norm of the North: King Sized Adventure';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver({
                        filePath: filePathWithoutHeaders,
                        hasHeaders: false,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['title'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected); 
                        done();
                    });
                });
    
                test('should return "Richard Finn, Tim Maltby" as director field for the first item', function(done) {
                    const expected = '"Richard Finn, Tim Maltby"';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver({
                        filePath: filePathWithoutHeaders,
                        hasHeaders: false,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['director'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "Alan Marriott, Andrew Toth, Brian Dobson, Cole Howard, Jennifer Cameron, Jonathan Holmes, Lee Tockar, Lisa Durupt, Maya Kay, Michael Dobson" as cast field for the first item', function(done) {
                    const expected = '"Alan Marriott, Andrew Toth, Brian Dobson, Cole Howard, Jennifer Cameron, Jonathan Holmes, Lee Tockar, Lisa Durupt, Maya Kay, Michael Dobson"';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver({
                        filePath: filePathWithoutHeaders,
                        hasHeaders: false,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['cast'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "United States, India, South Korea, China" as country field for the first item', function(done) {
                    const expected = '"United States, India, South Korea, China"';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver({
                        filePath: filePathWithoutHeaders,
                        hasHeaders: false,
                        headers: ['id', 'type', 'title', 'director', 'cast', 'countries', 'addedOn', 'year', 'rating', 'duration', 'genres', 'description']
                    });
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter === 0) {
                                actual = chunk['countries'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
            });

            suite('second item values', function() {

                test('should return 80117401 as show_id field for the second item', function(done) {
                    const expected = '80117401';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter <= 1) {
                                actual = chunk['show_id'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return Movie as type field for the second item', function(done) {
                    const expected = 'Movie';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter <= 1) {
                                actual = chunk['type'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "Jandino: Whatever it Takes" as title field for the second item', function(done) {
                    const expected = 'Jandino: Whatever it Takes';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter <= 1) {
                                actual = chunk['title'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done(); 
                    });
                });
    
                test('should return "" as director field for the second item', function(done) {
                    const expected = '';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter <= 1) {
                                actual = chunk['director'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "Jandino Asporaat" as cast field for the second item', function(done) {
                    const expected = 'Jandino Asporaat';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter <= 1) {
                                actual = chunk['cast'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
    
                test('should return "United Kingdom" as country field for the second item', function(done) {
                    const expected = 'United Kingdom';
                    let counter = 0;
                    let actual = '';
    
                    const parser = new csver(filePath);
    
                    parser.asObject().pipe(new Writable({
                        objectMode: true,
                        write(chunk, encoding, next) {
                            if(counter <= 1) {
                                actual = chunk['country'];
                                counter++;
                            }
                            next();
                        }
                    }))
                    .on('finish', function() {
                        assert.deepEqual(actual, expected);
                        done();
                    });
                });
            });
        });

    });

});