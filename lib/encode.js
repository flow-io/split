'use strict';

/**
* FUNCTION: encode( str, enc )
*	Encodes a UTF-8 string according to a specified encoding.
*
* @param {String} str - UTF-8 string to encode
* @param {String} enc - string encoding
* @returns {String} encoded string
*/
function encode( str, enc ) {
	// Check if we need to re-encode the string to something other than 'utf8'...
	if ( enc === 'utf8' || enc === 'buffer' ) {
		return str;
	}
	str = new Buffer( str );
	return str.toString( enc );
} // end FUNCTION encode()


// EXPORTS //

module.exports = encode;
