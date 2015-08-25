'use strict';

/**
* FUNCTION: decode( str, enc )
*	Re-decodes a UTF-8 string according to a specified encoding.
*
* @param {String} str - UTF-8 string to decode
* @param {String} enc - string encoding
* @returns {String} decoded string
*/
function decode( str, enc ) {
	// Check if we need to re-decode the string to something other than 'utf8'...
	if ( enc === 'utf8' || enc === 'buffer' ) {
		return str;
	}
	str = new Buffer( str );
	return str.toString( enc );
} // end FUNCTION decode()


// EXPORTS //

module.exports = decode;
