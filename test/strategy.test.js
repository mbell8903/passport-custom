/* global describe, it, expect */

var Strategy = require('../lib/strategy');

describe('Strategy', function () {

	var strategy = new Strategy(function () {
	});

	it('should be named custom', function () {
		expect(strategy.name).to.equal('custom');
	});

	it('should throw if constructed without a verify callback', function () {
		expect(function () {
			var s = new Strategy();
		}).to.throw(TypeError, 'CustomStrategy requires a verify callback');
	});

});
