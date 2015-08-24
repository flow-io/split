'use strict';

// MODULES //

var copy = require( 'utils-copy' ),
	Stream = require( './stream.js' );


// FACTORY //

/**
* FUNCTION: streamFactory( [options] )
*	Creates a reusable stream factory.
*
* @param {Object} [options] - stream options
* @param {String|RegExp} [options.sep=/\r?\n/] - separator used to split streamed data
* @param {Boolean} [options.objectMode=false] - specifies whether stream should operate in object mode
* @param {String|Null} [options.encoding=null] - specifies how Buffer objects should be decoded to `strings`
* @param {Number} [options.highWaterMark=16] - specifies the Buffer level for when `write()` starts returning `false`
* @param {Boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {Boolean} [options.writableObjectMode=false] - specifies whether the writable side should be in object mode
* @returns {Function} stream factory
*/
function streamFactory( options ) {
	var opts;
	if ( arguments.length ) {
		opts = copy( options );
	} else {
		opts = {};
	}
	/**
	* FUNCTION: createStream()
	*	Creates a stream.
	*
	* @returns {Stream} Transform stream
	*/
	return function createStream() {
		return new Stream( opts );
	};
} // end METHOD streamFactory()


// EXPORTS //

module.exports = streamFactory;
