/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai'),
	Strategy = require('../lib/strategy');

describe('Strategy', function () {

	describe('handling a request with valid credentials in query', function () {
		var strategy = new Strategy(function (req, done) {
			return done(null, { id: '1234' }, { scope: 'read' });
		});

		var user
			, info;

		before(function (done) {
			chai.passport(strategy)
				.success(function (u, i) {
					user = u;
					info = i;
					done();
				})
				.req(function (req) {
					req.query = {};
				})
				.authenticate();
		});

		it('should supply user', function () {
			expect(user).to.be.an.object;
			expect(user.id).to.equal('1234');
		});

		it('should supply info', function () {
			expect(info).to.be.an.object;
			expect(info.scope).to.equal('read');
		});
	});

	describe('calling back with options', function () {

		var optionsPassed;

		var strategy = new Strategy(function (req, options, done) {
			optionsPassed = options;
			return done(null, { id: '1234' }, { scope: 'read' });
		});

		var options = { 'a': 'b' };

		before(function (done) {
			chai.passport(strategy)
				.success(function (u, i) {
					done();
				})
				.req(function (req) {
					req.query = { };
				})
				.authenticate(options);
		});

		it('should pass options', function () {
			expect(optionsPassed).to.be.an.object;
			expect(optionsPassed).to.equal(options);
		});
	});
});
