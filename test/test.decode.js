/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	decode = require( './../lib/decode.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'decode', function tests() {

	it( 'should export a function', function test() {
		expect( decode ).to.be.a( 'function' );
	});

	it( 'should convert a UTF-8 string to a specified encoding', function test() {
		var str;

		str = decode( 'beep', 'base64' );
		assert.strictEqual( str, new Buffer( 'beep' ).toString( 'base64' ) );

		str = decode( 'beep', 'ascii' );
		assert.strictEqual( str, new Buffer( 'beep' ).toString( 'ascii' ) );
	});

	it( 'should return the input string if the specified encoding is either `utf8` or `buffer`', function test() {
		var str;

		str = decode( 'beep', 'utf8' );
		assert.strictEqual( str, 'beep' );

		str = decode( 'beep', 'buffer' );
		assert.strictEqual( str, 'beep' );
	});

});
