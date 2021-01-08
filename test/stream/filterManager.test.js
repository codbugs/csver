// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');

// import auxiliar libraries
const _ = require('lodash');
const { Readable, Transform, Writable } = require('stream');

// import object to test
const filterManager = require('../../src/stream/filterManager.js');


suite('csver', function() {

    suite('stream', function() {

        suite('filterManager', function() {

            suite('new()', function() {

                test('should throw error when passing a parameter different from an array', function() {
                    assert.throw(() => new filterManager(null), TypeError);
                    assert.throw(() => new filterManager(true), TypeError);
                    assert.throw(() => new filterManager(false), TypeError);
                    assert.throw(() => new filterManager(1), TypeError);
                    assert.throw(() => new filterManager(0), TypeError);
                    assert.throw(() => new filterManager(-1), TypeError);
                    assert.throw(() => new filterManager(''), TypeError);
                    assert.throw(() => new filterManager('lorem ipsum'), TypeError);
                    assert.throw(() => new filterManager({}), TypeError);
                    assert.throw(() => new filterManager(function() {}), TypeError);
                });

                test('should throw error when passing an array with an item that is not a function', function() {
                    assert.throw(() => new filterManager([() => true, 1]), TypeError);
                });

                test('should return a Transform object when passing an empty array', function() {
                    const actual = new filterManager([]);

                    assert.instanceOf(actual, Transform);
                });
                
                test('should return a Transform object when passing an array with items', function() {
                    const actual = new filterManager([() => true, () => true]);

                    assert.instanceOf(actual, Transform);
                });
            });

            suite('pipe()', function() {

                const pushTextStream = function(collection) {
                    return new Readable({
                        objectMode: true,
                        read(size) {
                            collection.forEach(item => this.push({
                                    value: item
                            }));
                            this.push(null);
                        }
                    });
                }

                const saveResult = function() {

                    const that = {
                        value: [],
                        writable: new Writable({
                            objectMode: true,
                            write(chunk, encoding, next) {
                                that.value.push(chunk);
                                next();
                            }
                        })
                    };
                    
                    return that;
                }

                test('should return filtered chunks when passing filters', function() {
                    const expected = [{ value: 'a' }, { value: 'b' }];
                    
                    const target = new filterManager([
                        item => !_.isEmpty(item.value),
                        item => _.trim(item.value) !== 'c']);
                    const stream = new saveResult();

                    pushTextStream(['', 'a', '', 'b', '', 'c', 'c'])
                        .pipe(target)
                        .pipe(stream.writable)
                        .on('finish', function() {
                            let actual = stream.value;
                            assert.deepEqual(actual, expected);
                        });
                });

                test('should return the same chunks when not passing filters', function() {
                    const expected = [{ value: '' }, { value: 'a' }, { value: 'b' }];
                    
                    const target = new filterManager([]);
                    const stream = new saveResult();

                    pushTextStream(['', 'a', 'b'])
                        .pipe(target)
                        .pipe(stream.writable)
                        .on('finish', function() {
                            let actual = stream.value;
                            assert.deepEqual(actual, expected);
                        });
                });

                

                test('should return the same chunks when passing filters throwing errors', function() {
                    const expected = [{ value: '' }, { value: 'a' }, { value: 'b' }];
                    
                    const target = new filterManager([() => {
                        throw new Error('testing error');
                    }]);
                    const stream = new saveResult();

                    pushTextStream(['', 'a', 'b'])
                        .pipe(target)
                        .pipe(stream.writable)
                        .on('finish', function() {
                            let actual = stream.value;
                            assert.deepEqual(actual, expected);
                        });
                });
            });
        });
    });
});