// import test libraries
const { suite, test } = require('mocha');
const { assert } = require('chai');

// import object to test
const createConfiguration = require('../src/configuration.js');


suite('csver', function() {

    suite('configuration', function() {

        suite('new()', function() {

            suite('options', function() {
                
                test('should throw error when is different from a string or an object', function() {
                    assert.throw(() => new createConfiguration(null), TypeError);
                    assert.throw(() => new createConfiguration(true), TypeError);
                    assert.throw(() => new createConfiguration(false), TypeError);
                    assert.throw(() => new createConfiguration(1), TypeError);
                    assert.throw(() => new createConfiguration(0), TypeError);
                    assert.throw(() => new createConfiguration(-1), TypeError);
                    assert.throw(() => new createConfiguration([]), TypeError);
                    assert.throw(() => new createConfiguration(function() {}, TypeError));
                });

                test('should throw error when empty string is passed', function() {
                    assert.throw(() => new createConfiguration(''), TypeError);
                });

                test('should return a configuration object with filePath parameter equals to the string passed', function() {
                    const expected = '/path/to/the/file.csv';

                    const configuration = createConfiguration(expected);
                    const actual = configuration.filePath;

                    assert.deepEqual(actual, expected);
                });

            });
            
            suite('columnSplitter parameter', function() {

                test('should throw error when is different from a string', function() {
                    assert.throw(() => new createConfiguration({
                        columnSplitter: null,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        columnSplitter: true,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        columnSplitter: false,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        columnSplitter: 1,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        columnSplitter: 0,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        columnSplitter: -1,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        columnSplitter: [],
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        columnSplitter: {},
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        columnSplitter: function() {},
                        filePath: './file.csv'
                    }), TypeError);
                });

                test('should return the same value as the parameter provided', function() {
                    const expected = ';;;';
                    const configuration = new createConfiguration({
                        columnSplitter: expected,
                        filePath: './file.csv'
                    });

                    assert.deepEqual(configuration.columnSplitter, expected);
                });

                test('should return comma character if no parameter is provided', function() {
                    const expected = ',';
                    const configuration = new createConfiguration({
                        filePath: './file.csv'
                    });

                    assert.deepEqual(configuration.columnSplitter, expected);
                });
            });

            suite('lineSplitter parameter', function() {

                test('should throw error when is different from a string', function() {
                    assert.throw(() => new createConfiguration({
                        lineSplitter: null,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        lineSplitter: true,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        lineSplitter: false,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        lineSplitter: 1,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        lineSplitter: 0,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        lineSplitter: -1,
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        lineSplitter: [],
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        lineSplitter: {},
                        filePath: './file.csv'
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        lineSplitter: function() {},
                        filePath: './file.csv'
                    }), TypeError);
                });

                test('should return the same value as the parameter provided', function() {
                    const expected = ';;;';
                    const configuration = new createConfiguration({
                        lineSplitter: expected,
                        filePath: './file.csv'
                    });

                    assert.deepEqual(configuration.lineSplitter, expected);
                });

                test('should return \r\n if no parameter is provided', function() {
                    const expected = '\r\n';
                    const configuration = new createConfiguration({
                        filePath: './file.csv'
                    });

                    assert.deepEqual(configuration.lineSplitter, expected);
                });
            });

            suite('filePath parameter', function() {

                test('should throw error when is different from a string', function() {
                    assert.throw(() => new createConfiguration({
                        filePath: null
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: true
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: false
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: 1
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: 0
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: -1
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: []
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: {}
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: function() {}
                    }), TypeError);
                });

                
                test('should throw error when is an empty string', function() {
                    assert.throw(() => new createConfiguration({
                        filePath: ''
                    }), TypeError);
                });

                test('should return the value passed', function() {
                    const expected = './file.csv';
                    const configuration = new createConfiguration({
                        filePath: expected
                    });

                    assert.deepEqual(configuration.filePath, expected);
                });
            });

            suite('filters parameter', function() {

                test('should throw error when is different from an array', function() {
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        filters: null
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        filters: 1
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        filters: 0
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        filters: -1
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        filters: undefined
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        filters: {}
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        filters: function() {}
                    }), TypeError);
                });

                test('should return an empty array by default', function() {
                    const expected = [];
                    const configuration = new createConfiguration({
                        filePath: './file.csv'
                    });

                    assert.deepEqual(configuration.headers, expected);
                });

                test('should return the list of headers passed', function() {
                    const expected = ['id', 'title', 'description'];
                    const configuration = new createConfiguration({
                        filePath: './file.csv',
                        filters: expected
                    });

                    assert.deepEqual(configuration.filters, expected);
                });
            });    

            suite('hasHeaders parameter', function() {

                test('should throw error when is different from a boolean', function() {
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        hasHeaders: null
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        hasHeaders: 1
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        hasHeaders: 0
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        hasHeaders: -1
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        hasHeaders: []
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        hasHeaders: {}
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        hasHeaders: function() {}
                    }), TypeError);
                });

                test('should return true by default', function() {
                    const expected = true;
                    const configuration = new createConfiguration({
                        filePath: './file.csv'
                    });

                    assert.deepEqual(configuration.hasHeaders, expected);
                });

                test('should return the value passed', function() {
                    const expected = false;
                    const configuration = new createConfiguration({
                        filePath: './file.csv',
                        hasHeaders: false
                    });

                    assert.deepEqual(configuration.hasHeaders, expected);
                });
            });

            suite('headers parameter', function() {

                test('should throw error when is different from an array', function() {
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        headers: null
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        headers: 1
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        headers: 0
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        headers: -1
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        headers: undefined
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        headers: {}
                    }), TypeError);
                    assert.throw(() => new createConfiguration({
                        filePath: './file.csv',
                        headers: function() {}
                    }), TypeError);
                });

                test('should return an empty array by default', function() {
                    const expected = [];
                    const configuration = new createConfiguration({
                        filePath: './file.csv'
                    });

                    assert.deepEqual(configuration.headers, expected);
                });

                test('should return the list of headers passed', function() {
                    const expected = ['id', 'title', 'description'];
                    const configuration = new createConfiguration({
                        filePath: './file.csv',
                        headers: expected
                    });

                    assert.deepEqual(configuration.headers, expected);
                });
            });
        });
    });
})