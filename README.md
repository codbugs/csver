# csver

A _csv_ file reader and parser based on Node.js _Stream_ module.

## Features

**csver** is a package that follows the csv file formats described in [RFC 4180](https://tools.ietf.org/html/rfc4180). The csv format rules covered are:

1. Each record is located on a separate line, delimited by a line break (CRLF).

2. The last record in the file may or may not have an ending line break.

3. There maybe an optional header line appearing as the first line of the file with the same format as normal record lines. This header will contain names corresponding to the fields in the file and should contain the same number of fields as the records in the rest of the file (the presence or absence of the header line should be indicated via the optional "header" parameter of this MIME type).

4. Within the header and each record, there may be one or more fields, separated by commas. Each line should contain the same number of fields throughout the file.  Spaces are considered part of a field and should not be ignored. The last field in the record must not be followed by a comma.

5. Each field may or may not be enclosed in double quotes. If fields are not enclosed with double quotes, then double quotes may not appear inside the fields.

6. If double-quotes are used to enclose fields, then a double-quote appearing inside a field must be escaped by preceding it with another double quote.

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
* _asArray_: Node.js Stream with chunks as an `array` with row values,
* _asObject_: Node.js Stream with chunks as an `Object` with properties as headers read.

#### **filepath**
Path to the csv file as a string

#### **options**
Configuration object with:
* _filePath (required)_: path to the csv file as a string,
* _columnSplitter (optional)_: character that separates csv columns. Comma (,) character by default,
* _lineSplitter (optional)_: characters that separates csv lines. Carriage return (\r) and line feed (\n) characters by default,
* _filters (optional)_: array of callbacks to filter content provided when objects is returned. Callback function must return true or false after evaluating the object provided. An object with row values is provided to the callback allowing to check values, properties, etc.,
* _hasHeaders (optional)_: boolean value to determine if csv file contains headers in the first line. By default, true is the value,
* _headers (optional)_: set of strings to set as headers for the csv file.


### **asArray()**
Returns a `Transform` stream. Each chunk is an `Array` with data for the line read excluding the header in case of _hasHeaders_ parameter set as true.

### **asObject()**
Returns a `Transform` stream. Each chunk is an `Object`, properties as the headers of the file, and data as the line read. If headers option has been set, properties will be these.

## Example

The following example shows how to use filters to avoid rows depending on the value of the first column. It is using the _"asArray()"_ method but you can use the _"asObject()"_ method as well.

```javascript
/* CSV CONTENT
type,animal,legs
mammal,dog,4
bird,sparrow,2
mammal,cat,4
bird,stork,2
*/


// imports
const csv = require('csver');
const { Writable } = require('stream');

// constant values
const PATH = '/path/to/csv/file';
const NON_VALID_ANIMAL = 'bird';

// app definition
const app = new csv({
    filePath: PATH,
    filters:  [item => item[0] !== NON_VALID_ANIMAL]
});

// output stream definition
const output = new Writable({
    objectMode: true,
    write(chunk, encoding, next) {
        console.log(chunk[0]);
        next();
    }
});

// show all items with first column different from the NON_VALID_ANIMAL constant.
app.asArray().pipe(output);

/* OUTPUT RESULT
mammal,dog,4
mammal,cat,4
*/
```