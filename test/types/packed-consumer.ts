import CustomStrategy = require('passport-custom');
import DefaultStrategy from 'passport-custom';
import { Strategy as NamedStrategy } from 'passport-custom';

const directStrategy = new CustomStrategy((request, done) => {
    done(null, { path: request.path });
});

const optionsStrategy = new CustomStrategy(
    { passOptionsToCallback: true },
    (request, options, done) => {
        done(null, { path: request.path, options });
    }
);

const defaultStrategy = new DefaultStrategy((request, done) => {
    done(null, { path: request.path });
});

const namedStrategy = new NamedStrategy((request, done) => {
    done(null, { path: request.path });
});

directStrategy.authenticate({} as never);
optionsStrategy.authenticate({} as never, { session: false });
defaultStrategy.authenticate({} as never);
namedStrategy.authenticate({} as never);
