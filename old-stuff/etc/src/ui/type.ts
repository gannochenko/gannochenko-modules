import { ObjectLiteral } from '../type';

export type ThemeInputType = {
    breakpoints?: {
        values: ObjectLiteral<number>;
        unit?: string;
    };
    util?: ObjectLiteral;
} & ObjectLiteral;

export type ThemeType = Required<ThemeInputType> &
    ThemeCacheType &
    ObjectLiteral;

type ThemeCacheType = {
    cache: {
        breakpoints: {
            values: number[];
            keys: string[];
        } & ObjectLiteral;
    } & ObjectLiteral;
};

export type PageNavigationStructure = {
    pages: {
        backward: number;
        forward: number;
        count: number;
        range: number[];
        current: number;
    };
    arrows: {
        first: boolean;
        backward: boolean;
        forward: boolean;
        last: boolean;
    };
};
