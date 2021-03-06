'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isNonNegative = require( 'validate.io-nonnegative' ),
	isString = require( 'validate.io-string-primitive' ),
	isRegExp = require( 'validate.io-regexp' );


// VALDIATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - function options
* @param {String|RegExp} [options.sep] - separator used to split streamed data
* @param {Boolean} [options.objectMode] - specifies whether stream should operate in object mode
* @param {String|Null} [options.encoding] - specifies how Buffer objects should be decoded to `strings`
* @param {Number} [options.highWaterMark] - specifies the Buffer level for when `write()` starts returning `false`
* @param {Boolean} [options.allowHalfOpen] - specifies whether the stream should remain open even if one side ends
* @param {Boolean} [options.writableObjectMode] - specifies whether the writable side should be in object mode
* @returns {Null|Error} null or an error object
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) && !isRegExp( opts.sep ) ) {
			return new TypeError( 'invalid option. Separator option must be either a string or a regular expression. Option: `' + opts.sep + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'objectMode' ) ) {
		opts.objectMode = options.objectMode;
		if ( !isBoolean( opts.objectMode ) ) {
			return new TypeError( 'invalid option. Object mode option must be a boolean primitive. Option: `' + opts.objectMode + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'writableObjectMode' ) ) {
		opts.writableObjectMode = options.writableObjectMode;
		if ( !isBoolean( opts.writableObjectMode ) ) {
			return new TypeError( 'invalid option. Writable object mode option must be a boolean primitive. Option: `' + opts.writableObjectMode + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'encoding' ) ) {
		opts.encoding = options.encoding;
		if ( !isString( opts.encoding ) ) {
			return new TypeError( 'invalid option. Encoding option must be a string primitive. Option: `' + opts.encoding + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'allowHalfOpen' ) ) {
		opts.allowHalfOpen = options.allowHalfOpen;
		if ( !isBoolean( opts.allowHalfOpen ) ) {
			return new TypeError( 'invalid option. Allow half open option must be a boolean primitive. Option: `' + opts.allowHalfOpen + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'highWaterMark' ) ) {
		opts.highWaterMark = options.highWaterMark;
		if ( !isNonNegative( opts.highWaterMark ) ) {
			return new TypeError( 'invalid option. High watermark option must be a nonnegative number. Option: `' + opts.highWaterMark + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
