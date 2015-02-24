# passport-custom

[![Build](https://travis-ci.org/mbell8903/passport-custom.png)](https://travis-ci.org/mbell8903/passport-custom)
[![Coverage Status](https://coveralls.io/repos/mbell8903/passport-custom/badge.png)](https://coveralls.io/r/mbell8903/passport-custom)
[![Quality](https://codeclimate.com/github/mbell8903/passport-custom.png)](https://codeclimate.com/github/mbell8903/passport-custom)
[![Dependencies](https://david-dm.org/mbell8903/passport-custom.png)](https://david-dm.org/mbell8903/passport-custom)
[![Tips](http://img.shields.io/gittip/mbell8903.png)](https://www.gittip.com/mbell8903/)


[Passport](http://passportjs.org/) strategy for authenticating with custom logic.

This module lets you authenticate using custom logic in your Node.js
applications. It is based on passport-local module by Jared Hanson.
By plugging into Passport, custom authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-custom

## Usage

#### Configure Strategy

The custom authentication strategy authenticates users by custom logic.
The strategy requires a `verify` callback, which is where the custom
logic goes and calls `done` providing a user.
Here is the pseudo code.

    passport.use('custom', new CustomStrategy(
      function(done) {
        User.findOne({ uid: 1 }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'custom'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.post('/login', 
      passport.authenticate('custom', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });

## Examples

For complete, working examples, refer to the multiple [examples](https://github.com/mbell8903/passport-custom/tree/master/examples) included.

## Tests

    $ npm install
    $ npm test

## Credits

  - [Mike Bell](http://github.com/mbell8903)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 Mike Bell
