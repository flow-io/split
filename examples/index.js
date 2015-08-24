'use strict';

var through2 = require( 'through2' ),
	stream = require( './../lib' );

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
