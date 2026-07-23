var chai = require('chai'),
	nodeTest = require('node:test');

chai.use(require('chai-passport-strategy'));

/*
 * Preserve the existing Mocha-style test globals while using Node's built-in
 * runner, which is available across every Node.js version in the CI matrix.
 */
global.describe = nodeTest.describe;
global.it = nodeTest.it;

/**
 * Register a Node test hook using Mocha's error-first completion callback.
 *
 * @param {Function} hook legacy callback-based setup hook
 * @returns {void}
 */
global.before = function (hook) {
	nodeTest.before(function () {
		return new Promise(function (resolve, reject) {
			hook(function (err) {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
};

global.expect = chai.expect;
