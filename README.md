Split
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a [transform stream](https://nodejs.org/api/stream.html) which splits streamed data.


## Installation

``` bash
$ npm install flow-split
```


## Usage

``` javascript
var stream = require( 'flow-split' );
```

#### stream( [options] )

Creates a [transform stream](https://nodejs.org/api/stream.html) which splits streamed data.

``` javascript
var tStream = stream();

tStream.pipe( process.stdout );
tStream.write( '1\n2\n3' );
// => 1 => 2 => 3

tStream.end();
```

The function accepts the following `options`:

*	__sep__: separator used to split streamed data. Similar to [`String#split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), a separator may be either a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) or a `string`. Default: `/\r?\n/`.
*	__objectMode__: `boolean` which specifies whether a [stream](https://nodejs.org/api/stream.html) should operate in object mode. Default: `false`.
* 	__encoding__: specifies how `Buffer` objects should be decoded to `strings`. Default: `null`.
*	__highWaterMark__: specifies the `Buffer` level at which `write()` calls start returning `false`. Default: `16` (16kb).
*	__allowHalfOpen__: specifies whether a [stream](https://nodejs.org/api/stream.html) should remain open even if one side ends. Default: `false`.
*	__writableObjectMode__: specifies whether the writable side should be in object mode. Default: `false`.

To set [stream](https://nodejs.org/api/stream.html) `options`,

``` javascript
var opts = {
	'sep': ',',
	'objectMode': true,
	'encoding': 'utf8',
	'highWaterMark': 64,
	'allowHalfOpen': true,
	'writableObjectMode': false // overridden by `objectMode` option when `objectMode=true`
};

var tStream = stream( opts );
```

#### stream.factory( [options] )

Creates a reusable [stream](https://nodejs.org/api/stream.html) factory. The factory method ensures [streams](https://nodejs.org/api/stream.html) are configured identically by using the same set of provided `options`.

``` javascript
var opts = {
	'sep': '\t',
	'objectMode': true,
	'encoding': 'utf8',
	'highWaterMark': 64	
};

var factory = stream.factory( opts );

// Create 10 identically configured streams...
var streams = [];
for ( var i = 0; i < 10; i++ ) {
	streams.push( factory() );
}
```


#### stream.objectMode( [options] )

This method is a convenience function to create [streams](https://nodejs.org/api/stream.html) which always operate in `objectMode`. The method will __always__ override the `objectMode` option in `options`.

``` javascript
var tStream = stream.objectMode({
	'sep': ','
});

tStream.pipe( process.stdout );
tStream.write( 'a,b,c' );
// => a => b => c

tStream.end();
```


## Notes

*	Similar to `String#split`, a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) separator containing a matching group will result in the separator being retained in the output stream.

	``` javascript
	var tStream = stream({
		'sep': /(,)/
	});

	tStream.pipe( process.stdout );
	tStream.write( '1,2,3' );
	// => 1 => , => 2 => , => 3

	tStream.end();
	```


## Examples

``` javascript
var through2 = require( 'through2' ),
	stream = require( 'flow-split' );

// Create a stream to make newline delimited data...
var newlines = through2( function onData( chunk, enc, clbk ) {
	this.push( chunk.toString() + '\n' );
	clbk();
});

// Create a new split stream:
var tStream = stream({
	'sep': /\t/
});

// Create a stream pipeline:
tStream
	.pipe( newlines )
	.pipe( process.stdout );

// Write values to the stream...
for ( var i = 0; i < 10; i++ ) {
	tStream.write( i+'\t', 'utf8'  );
}
tStream.end();
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Flow.io](http://flow-io.com) Authors.


[npm-image]: http://img.shields.io/npm/v/flow-split.svg
[npm-url]: https://npmjs.org/package/flow-split

[travis-image]: http://img.shields.io/travis/flow-io/split/master.svg
[travis-url]: https://travis-ci.org/flow-io/split

[codecov-image]: https://img.shields.io/codecov/c/github/flow-io/split/master.svg
[codecov-url]: https://codecov.io/github/flow-io/split?branch=master

[dependencies-image]: http://img.shields.io/david/flow-io/split.svg
[dependencies-url]: https://david-dm.org/flow-io/split

[dev-dependencies-image]: http://img.shields.io/david/dev/flow-io/split.svg
[dev-dependencies-url]: https://david-dm.org/dev/flow-io/split

[github-issues-image]: http://img.shields.io/github/issues/flow-io/split.svg
[github-issues-url]: https://github.com/flow-io/split/issues
