/* global describe, it, expect, before */

var chai = require('chai'),
	Strategy = require('../lib/strategy');

describe('Strategy', function () {

	describe('encountering an error during verification', function () {
		var strategy = new Strategy(function (req, done) {
			done(new Error('something went wrong'));
		});

		var err;

		before(function (done) {
			chai.passport(strategy)
				.error(function (e) {
					err = e;
					done();
				})
				.req(function (req) {
					req.body = {};
				})
				.authenticate();
		});

		it('should error', function () {
			expect(err).to.be.an.instanceof(Error);
			expect(err.message).to.equal('something went wrong');
		});
	});

	describe('encountering an exception during verification', function () {
		var strategy = new Strategy(function (req, done) {
			throw new Error('something went horribly wrong');
		});

		var err;

		before(function (done) {
			chai.passport(strategy)
				.error(function (e) {
					err = e;
					done();
				})
				.req(function (req) {
					req.body = {};
				})
				.authenticate();
		});

		it('should error', function () {
			expect(err).to.be.an.instanceof(Error);
			expect(err.message).to.equal('something went horribly wrong');
		});
	});

});
