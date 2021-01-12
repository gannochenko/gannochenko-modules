import { camel } from 'naming-style';
import { Nullable, Scalar } from './type';

export const union = (arg1: any[], arg2: any[]) => [...arg1, ...arg2];

export const intersection = (...args: any[][]) =>
    args.reduce((a, b) => a.filter(c => b.includes(c)));

export const difference = (...args: any[][]) =>
        args.reduce((a, b) => a.filter(c => !b.includes(c)));

// @ts-ignore
export const unique = (arg: any[]) => [...new Set(arg)]; // todo: heavy, but for now okay

export const uCFirst = (str: string) =>
    `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length - 1)}`;

export const lCFirst = (str: string) =>
    `${str.substr(0, 1).toLowerCase()}${str.substr(1, str.length - 1)}`;

export const convertToCamel = (str: string) => {
    const strLowerCased = camel(str.toLowerCase());
    return `${strLowerCased.substr(0, 1).toUpperCase()}${strLowerCased.substr(
        1,
        strLowerCased.length - 1,
    )}`;
};

export const pInt = (val: Nullable<Scalar>) => {
    let iVal = 0;
    if (typeof val === 'string') {
        iVal = parseInt(val, 10);
        if (Number.isNaN(iVal)) {
            iVal = 0;
        }
    } else if (typeof val !== 'undefined' && val !== null) {
        iVal = val;
    }

    return iVal;
};

/**
 * Performs an operation on val by applying a function
 */
export const op = (val: Nullable<Scalar>, fn: (arg: number) => number) => {
    if (typeof val === 'undefined' || val === null) {
        return val;
    }

    const results = val
        .toString()
        .trim()
        .match(/^(\d+)?(.(\d+))?(px|rem|em)?$/i);
    if (results && results.length) {
        const full = pInt(results[1]);
        const frac = pInt(results[3]);
        const unit = results[4] || '';

        return `${fn(full + +`0.${frac}`)}${unit}`;
    }

    return val.toString();
};
