// @ts-ignore
import { stringify, parse } from '@m59/qs';
import { Nullable, ObjectLiteral } from './type';

export const injectPassword = (
    url: string,
    password: Nullable<string> = null,
) => {
    if (typeof password === 'string' && password.length) {
        const oUrl = new URL(url);
        oUrl.password = password;

        url = oUrl.toString();
    }

    return url;
};

export const decomposeURL = (url: string) => {
    const oUrl = new URL(url);

    const parts = {
        host: oUrl.hostname,
        port: oUrl.port,
        password: oUrl.password,
    };

    if (!parts.host.length) {
        // invalid url
        return null;
    }

    if (Number.isNaN(Number(parts.port))) {
        delete parts.port;
    }

    return parts;
};

export const putSearchParameters = (url: string, params: ObjectLiteral) => {
    return `?${stringify(
        { ...parse(url.replace(/^\?/, '')), ...params},
    )}`;
};

export const parseSearch = (url: string) => parse(url.replace(/^\?/, ''));
export const sanitize = (str: string) => str.replace(/[^a-z0-9_-]/gi, '');
export const escapeQuote = (str: string) => str.replace(/"/g, '"');
