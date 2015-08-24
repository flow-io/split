/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	encode = require( './../lib/encode.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'encode', function tests() {

	it( 'should export a function', function test() {
		expect( encode ).to.be.a( 'function' );
	});

	it( 'should convert a UTF-8 encoded string to a specified encoding', function test() {
		var str;

		str = encode( 'beep', 'base64' );
		assert.strictEqual( str, new Buffer( 'beep' ).toString( 'base64' ) );

		str = encode( 'beep', 'ascii' );
		assert.strictEqual( str, new Buffer( 'beep' ).toString( 'ascii' ) );
	});

	it( 'should return the input string if the specified encoding is either `utf8` or `buffer`', function test() {
		var str;

		str = encode( 'beep', 'utf8' );
		assert.strictEqual( str, 'beep' );

		str = encode( 'beep', 'buffer' );
		assert.strictEqual( str, 'beep' );
	});

});
