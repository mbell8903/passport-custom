import CustomStrategy = require('../..');
import DefaultStrategy from '../..';
import { Strategy as NamedStrategy } from '../..';

const directStrategy = new CustomStrategy((request, done) => {
    done(null, { path: request.path });
});

const namedStrategy = new CustomStrategy.Strategy(
    { passOptionsToCallback: true },
    (request, options, done) => {
        done(null, { path: request.path, options });
    }
);

const defaultStrategy = new DefaultStrategy((request, done) => {
    done(null, { path: request.path });
});

const importedNamedStrategy = new NamedStrategy((request, done) => {
    done(null, { path: request.path });
});

directStrategy.authenticate({} as never);
namedStrategy.authenticate({} as never, { session: false });
defaultStrategy.authenticate({} as never);
importedNamedStrategy.authenticate({} as never);
