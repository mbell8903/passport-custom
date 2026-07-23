# Releasing passport-custom

This project uses npm trusted publishing and staged publishing so a package is
reviewed before it becomes the default installation.

## Prerequisites

- The npm trusted publisher must reference `mbell8903/passport-custom` and the
  `publish.yml` workflow, with `npm stage publish` allowed.
- The maintainer approving or promoting a package must have npm two-factor
  authentication enabled.
- The release commit must be merged into `master` with all required checks
  passing.

## Prepare the release

1. Update `CHANGELOG.md` with the release version and date.
2. Update `package.json` and `package-lock.json` without creating a tag:

   ```sh
   npm version <version> --no-git-tag-version
   ```

3. Run the release checks:

   ```sh
   npm ci
   npm test
   npm run coverage:check
   npm run typecheck
   npm pack --dry-run
   ```

4. Merge the release pull request into `master`.

## Stage the package

Create an annotated tag from the final `master` commit and push it:

```sh
git switch master
git pull --ff-only
git tag -a <version> -m "<version>"
git push origin <version>
```

Pushing the tag runs the Node.js 18, 20, 22, and 24 test matrix. If every check
passes, the workflow submits the package to npm staged publishing under the
`next` distribution tag. It does not change `latest`.

Review the workflow summary and confirm:

- the source commit and tag are correct;
- the package version matches the tag;
- the package file list is expected;
- the SHA-1 and SHA-512 integrity match npm's staged-package view;
- npm generated a provenance statement for the GitHub Actions run.

Approve the candidate from npm's **Staged Packages** page using two-factor
authentication.

## Publish the release

After approval, verify the candidate from an unauthenticated registry request:

```sh
npm view passport-custom@next version dist.shasum dist.integrity gitHead --json
```

Publish the matching GitHub Release, then promote the reviewed version:

```sh
npm dist-tag add passport-custom@<version> latest
npm view passport-custom dist-tags --json
```

Both `latest` and `next` should now resolve to the released version.

## Recovery

Published npm versions are immutable. If a serious regression is discovered,
move `latest` back to the previous known-good version while preparing a new
patch release:

```sh
npm dist-tag add passport-custom@<previous-version> latest
```

Do not delete or move a published Git tag, and do not attempt to replace an npm
version that has already been published.
