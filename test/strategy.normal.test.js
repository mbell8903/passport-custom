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

		/*
		 * Use a zero-arity callback to prove option passing is controlled by
		 * explicit strategy configuration rather than Function.length.
		 */
		var verify = function () {
			var options = arguments[1],
				done = arguments[2];

			optionsPassed = options;
			return done(null, { id: '1234' }, { scope: 'read' });
		};

		var strategy = new Strategy(
			{ passOptionsToCallback: true },
			verify
		);

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

	describe('using legacy callback arguments without explicit options', function () {

		var argumentCount;

		/*
		 * Deliberately declare three parameters. The strategy must not infer
		 * behavior from Function.length when passOptionsToCallback is unset.
		 */
		var strategy = new Strategy(function (req, done, unused) {
			argumentCount = arguments.length;
			return done(null, { id: '1234' });
		});

		before(function (done) {
			chai.passport(strategy)
				.success(function () {
					done();
				})
				.req(function (req) {
					req.query = {};
				})
				.authenticate({ 'a': 'b' });
		});

		it('should use the legacy two-argument callback convention', function () {
			expect(argumentCount).to.equal(2);
		});
	});
});
