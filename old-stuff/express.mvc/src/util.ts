import { NextFunction, Request, Response } from 'express';

export const isStringNotEmpty = (arg: unknown) =>
    typeof arg === 'string' && arg.length > 0;

export const isObject = (arg: unknown) =>
    arg !== null && (typeof arg === 'object' || typeof arg === 'function');

export const isObjectNotEmpty = (arg: unknown) =>
    isObject(arg) && Object.keys(arg as object).length > 0;

export const isArray = (arg: unknown) => Array.isArray(arg);

export const intersection = (...args: any[][]) =>
    args.reduce((a, b) => a.filter(c => b.includes(c)));

export const wrapError = (fn: Function) => async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await fn(req, res, next);
    } catch (e) {
        next(e);
    }
};
