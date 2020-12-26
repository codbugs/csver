# csver

A CSV file reader and parser based on Node.js `Stream` module.


## Install

```node
$ npm install csver
```


## Usage

```javascript
const csver = require('csver');
const path = '/path/to/file/csv';

// csv data row as an array of values to be piped
new csver(path).asArray();

// csv data row as an object with headers as properties and data row as values to be piped
new csver(path).asObject();
```


## API

### **csver(options|filepath)**
Returns the parser object with:
* _asArray_: Node.js Stream with chunks as an array with row values,
* _asObject_: Node.js Stream with chunks as an Object with properties as headers read.

#### **filepath**
Path to the csv file as a string

#### **options**
Configuration object with:
* _filePath (required)_: path to the csv file as a string,
* _columnSplitter (optional)_: character that separates csv columns. Comma (,) character by default,
* _lineSplitter (optional)_: characters that separates csv lines. Carriage return (\r) and line feed (\n) characters by default,

### **asArray()**
Returns a `Transform` stream. Each chunk is an `Array` with data for the line read excluding the header.

#### **asObject()**
Returns a `Transform` stream. Each chunk is an `Object`, properties as the headers of the file, and data as the line read.