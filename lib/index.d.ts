import type { Request } from 'express';
import passport = require('passport');

declare class CustomStrategy implements passport.Strategy {
    readonly name: 'custom';
    constructor(verify: CustomStrategy.VerifyCallback);
    constructor(options: CustomStrategy.StrategyOptions, verify: CustomStrategy.VerifyCallbackWithOptions);
    authenticate(req: Request, options?: any): void;
}

declare namespace CustomStrategy {
    const Strategy: typeof CustomStrategy;

    interface VerifyCallback {
        (req: Request, done: VerifiedCallback): void;
    }

    interface VerifyCallbackWithOptions {
        (req: Request, options: any, done: VerifiedCallback): void;
    }

    interface VerifiedCallback {
        (error: any, user?: any, info?: any): void;
    }

    interface StrategyOptions {
        passOptionsToCallback: true;
    }
}

export = CustomStrategy;
