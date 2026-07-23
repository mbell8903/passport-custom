import { Strategy as PassportStrategy } from 'passport-strategy';
import { Request } from 'express';

export interface VerifyCallback {
    (req: Request, done: VerifiedCallback): void;
}

export interface VerifyCallbackWithOptions {
    (req: Request, options: any, done: VerifiedCallback): void;
}

export interface VerifiedCallback {
    (error: any, user?: any, info?: any): void;
}

export interface StrategyOptions {
    passOptionsToCallback: true;
}

export declare class Strategy extends PassportStrategy {
    constructor(verify: VerifyCallback);
    constructor(options: StrategyOptions, verify: VerifyCallbackWithOptions);
    authenticate(req: Request, options?: any): any;
}

