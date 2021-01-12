import { ThemeInputType, ThemeType } from './type';
import {
    breakpointUp,
    breakpointDown,
    breakpointBetween,
    breakpointOnly,
    media,
} from './media';
import { ObjectLiteral } from '../type';

export const makeTheme = (theme: ThemeInputType) => {
    theme = theme || {};
    theme.breakpoints = {
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
        unit: 'px',
        ...theme.breakpoints,
    };

    const resultTheme = theme as ThemeType;

    resultTheme.util = {
        ...resultTheme.util,
        breakpointUp: (breakpoint: string, prefix?: string) =>
            breakpointUp(resultTheme, breakpoint, prefix),
        breakpointDown: (breakpoint: string, prefix?: string) =>
            breakpointDown(resultTheme, breakpoint, prefix),
        breakpointOnly: (breakpoint: string, prefix?: string) =>
            breakpointOnly(resultTheme, breakpoint, prefix),
        breakpointBetween: (
            breakpointStart: string,
            breakpointEnd: string,
            prefix?: string,
        ) =>
            breakpointBetween(
                resultTheme,
                breakpointStart,
                breakpointEnd,
                prefix,
            ),
        media: (config: ObjectLiteral) => media(resultTheme, config),
    };

    resultTheme.cache = {
        breakpoints: {
            values: Object.values(theme.breakpoints.values),
            keys: Object.keys(theme.breakpoints.values),
        },
    };

    return resultTheme;
};
