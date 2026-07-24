# Changelog

All notable changes to this project will be documented in this file.

## 1.2.1 - 2026-07-24

### Added

- Isolated packed-consumer TypeScript validation for CommonJS, default, and
  named strategy imports.
- Enforcement of the expected npm package contents before staging a release.

### Changed

- Added safe npm publication defaults that target npmjs.org under the `next`
  distribution tag.
- Pinned the npm CLI used for staged publishing for reproducible releases.

### Security

- Prevented GitHub checkout credentials from persisting into test and release
  workflow steps.

## 1.2.0 - 2026-07-23

### Added

- Explicit `passOptionsToCallback` strategy option for callbacks that need
  Passport authentication options.
- GitHub Actions testing on Node.js 18, 20, 22, and 24.
- Staged npm publishing under the `next` distribution tag.
- Built-in code coverage reporting with enforced coverage thresholds.
- TypeScript consumer validation.

### Changed

- Preserved the legacy two-argument verify callback unless option passing is
  explicitly enabled.
- Updated the test runner, Chai, and `chai-passport-strategy`.
- Modernized package metadata and restricted published files to `lib`.
- Modernized project documentation and development commands.

### Security

- Configured trusted publishing so automated releases do not require
  long-lived npm credentials.
- Pinned GitHub-owned workflow actions to immutable commit SHAs.
