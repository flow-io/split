/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	Transform = require( 'readable-stream' ).Transform,
	through2 = require( 'through2' ),
	Stream = require( './../lib/stream.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'Stream', function tests() {

	it( 'should export a function', function test() {
		expect( Stream ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		expect( foo ).to.throw( TypeError );
		function foo() {
			var s = new Stream({
				'objectMode': 'beep'
			});
		}
	});

	it( 'should return a Transform stream', function test() {
		var s = new Stream();
		assert.instanceOf( s, Transform );
	});

	it( 'should not require the `new` operator', function test() {
		var stream = Stream,
			s;

		s = stream();
		assert.instanceOf( s, Transform );

		s = stream({});
		assert.instanceOf( s, Transform );
	});

	it( 'should split streamed data', function test( done ) {
		var expected,
			cnt,
			d,
			s, t;

		s = new Stream();
		t = through2( onData );

		d = '1\n2\n3';
		expected = ['1','2','3'];
		cnt = 0;

		s.pipe( t );
		s.write( d );
		s.end();

		function onData( chunk, enc, clbk ) {
			assert.strictEqual( chunk.toString(), expected[ cnt ] );
			clbk();

			cnt += 1;
			if ( cnt === expected.length ) {
				done();
			}
		}
	});

	it( 'should split streamed data in object mode', function test( done ) {
		var expected,
			cnt,
			d,
			s, t;

		s = new Stream({
			'objectMode': true,
			'sep': '--'
		});
		t = through2( onData );

		d = '1--2--3';
		expected = ['1','2','3'];
		cnt = 0;

		s.pipe( t );
		s.write( d );
		s.end();

		function onData( chunk, enc, clbk ) {
			assert.strictEqual( chunk.toString(), expected[ cnt ] );
			clbk();

			cnt += 1;
			if ( cnt === expected.length ) {
				done();
			}
		}
	});

	it( 'should split streamed data when provided Buffer objects', function test( done ) {
		var expected,
			cnt,
			d,
			s, t;

		s = new Stream({
			'sep': ','
		});
		t = through2( onData );

		d = '1,2,3';
		expected = ['1','2','3'];
		cnt = 0;

		s.pipe( t );
		s.write( new Buffer( d ) );
		s.end();

		function onData( chunk, enc, clbk ) {
			assert.strictEqual( chunk.toString(), expected[ cnt ] );
			clbk();

			cnt += 1;
			if ( cnt === expected.length ) {
				done();
			}
		}
	});

	it( 'should split streamed data not encoded as UTF-8', function test( done ) {
		var expected,
			cnt,
			d,
			s, t;

		s = new Stream({
			'encoding': 'base64',
			'sep': /\|/
		});
		t = through2( onData );

		d = new Buffer( '1|2|3' );
		d = d.toString( 'base64' );

		expected = ['1','2','3'];
		cnt = 0;

		s.pipe( t );
		s.write( d, 'base64' );
		s.end();

		function onData( chunk, enc, clbk ) {
			chunk = chunk.toString();
			chunk = new Buffer( chunk, 'base64' );
			chunk = chunk.toString();
			assert.strictEqual( chunk, expected[ cnt ] );
			clbk();

			cnt += 1;
			if ( cnt === expected.length ) {
				done();
			}
		}
	});

	it( 'should split streamed data using a separator containing a matching group', function test( done ) {
		var expected,
			cnt,
			d,
			s, t;

		s = new Stream({
			'sep': /(,)/
		});
		t = through2( onData );

		d = '1,2,3';
		expected = ['1',',','2',',','3'];
		cnt = 0;

		s.pipe( t );
		s.write( d );
		s.end();

		function onData( chunk, enc, clbk ) {
			assert.strictEqual( chunk.toString(), expected[ cnt ] );
			clbk();

			cnt += 1;
			if ( cnt === expected.length ) {
				done();
			}
		}
	});

	it( 'should flush any remaining streamed data', function test( done ) {
		var expected,
			cnt,
			d,
			s, t;

		s = new Stream();
		t = through2( onData );

		d = '1\r\n2\r\n3\r\n4\r\n5\r\n6\r\n';
		expected = ['1','2','3','4','5','6'];
		cnt = 0;

		s.pipe( t );
		s.write( d );
		s.end();

		function onData( chunk, enc, clbk ) {
			assert.strictEqual( chunk.toString(), expected[ cnt ] );
			clbk();

			cnt += 1;
			if ( cnt === expected.length ) {
				done();
			}
		}
	});

	it( 'should provide a method to destroy a stream', function test( done ) {
		var count = 0,
			s;

		s = new Stream();

		expect( s.destroy ).to.be.a( 'function' );

		s.on( 'error', onError );
		s.on( 'close', onClose );

		s.destroy( new Error() );

		function onError( err ) {
			count += 1;
			if ( err ) {
				assert.ok( true );
			} else {
				assert.ok( false );
			}
			if ( count === 2 ) {
				done();
			}
		}
		function onClose() {
			count += 1;
			assert.ok( true );
			if ( count === 2 ) {
				done();
			}
		}
	});

	it( 'should not allow a stream to be destroyed more than once', function test( done ) {
		var s;

		s = new Stream();

		s.on( 'error', onError );
		s.on( 'close', onClose );

		// If the stream is closed twice, the test will error...
		s.destroy();
		s.destroy();

		function onClose() {
			assert.ok( true );
			done();
		}
		function onError( err ) {
			assert.ok( false );
		}
	});

});
