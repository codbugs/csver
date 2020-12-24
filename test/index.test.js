// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');

// helper libraries
const { Transform, Writable } = require('stream');


// import object to test
const csver = require('../src/index.js');


suite('csver', function() {

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

        test('should return 30 items', function() {
            const expected = 30;
            let actual = 0;
            
            const parser = new csver(filePath);

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
    });

});