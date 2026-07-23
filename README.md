# passport-custom

[![Build](https://github.com/mbell8903/passport-custom/actions/workflows/publish.yml/badge.svg)](https://github.com/mbell8903/passport-custom/actions/workflows/publish.yml)

[Passport](https://www.passportjs.org/) strategy for authenticating with custom logic.

This module lets you authenticate using custom logic in your Node.js
applications. It is based on the `passport-local` module by Jared Hanson.
By plugging into Passport, custom authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](https://github.com/senchalabs/connect)-style middleware, including
[Express](https://expressjs.com/).

## Install

```shell
npm install passport-custom
```

## Usage

### Configure a strategy

The strategy requires a `verify` callback containing your authentication logic.
The request is always passed as the first argument. Call `done` with an error,
the authenticated user, and optional authentication information.

```js
const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;

passport.use(new CustomStrategy(
  function(req, done) {
    User.findOne({
      username: req.body.username
    }, function (err, user) {
      done(err, user);
    });
  }
));
```

To explicitly pass Passport authentication options to the verify callback, set
`passOptionsToCallback` when constructing the strategy:

```js
passport.use(new CustomStrategy(
  { passOptionsToCallback: true },
  function(req, options, done) {
    // Use request-specific authentication options here.
    done(null, user);
  }
));
```

### Authenticate requests

Use `passport.authenticate()` with the `custom` strategy, or the name supplied
when registering the strategy.

For example, as route middleware in an [Express](https://expressjs.com/)
application:

```js
app.post('/login',
  passport.authenticate('custom', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
```

## Tests

```shell
npm install
npm test
npm run typecheck
npm run coverage
```

Continuous integration enforces 100% line and function coverage and 90% branch
coverage on Node.js 24.

## Credits

- [Mike Bell](https://github.com/mbell8903)

## License

[MIT](LICENSE)

Copyright (c) 2014-present Mike Bell
