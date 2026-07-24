'use strict';

const assert = require('node:assert/strict'),
	childProcess = require('node:child_process'),
	fs = require('node:fs'),
	os = require('node:os'),
	path = require('node:path');

const packageRoot = path.resolve(__dirname, '../..'),
	tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'passport-custom-types-'));

try {
	// Build the real package so the test validates the published file boundary.
	const packResult = JSON.parse(childProcess.execFileSync(
		'npm',
		['pack', '--json', '--pack-destination', tempRoot],
		{ cwd: packageRoot, encoding: 'utf8' }
	))[0];
	const packedPaths = packResult.files.map(function (file) {
		return file.path;
	}).sort();

	// Keep the public package boundary intentional and prevent accidental files
	// from being included in future releases.
	assert.deepEqual(packedPaths, [
		'CHANGELOG.md',
		'LICENSE',
		'README.md',
		'lib/index.d.ts',
		'lib/index.js',
		'lib/strategy.js',
		'package.json'
	]);

	const tarballPath = path.join(tempRoot, packResult.filename),
		consumerPath = path.join(tempRoot, 'consumer.ts');

	fs.copyFileSync(
		path.join(__dirname, 'packed-consumer.ts'),
		consumerPath
	);
	fs.writeFileSync(
		path.join(tempRoot, 'package.json'),
		JSON.stringify({ private: true }, null, 2)
	);

	// Install only the tarball and its declared dependencies in isolation.
	childProcess.execFileSync(
		'npm',
		[
			'install',
			'--ignore-scripts',
			'--package-lock=false',
			tarballPath
		],
		{ cwd: tempRoot, stdio: 'inherit' }
	);

	childProcess.execFileSync(
		process.execPath,
		[
			path.join(packageRoot, 'node_modules/typescript/bin/tsc'),
			'--module',
			'commonjs',
			'--esModuleInterop',
			'--noEmit',
			'--strict',
			'--skipLibCheck',
			'false',
			consumerPath
		],
		{ cwd: tempRoot, stdio: 'inherit' }
	);
} finally {
	// The directory is uniquely created under the operating system temp root.
	fs.rmSync(tempRoot, { recursive: true, force: true });
}
