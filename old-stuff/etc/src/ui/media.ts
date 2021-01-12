import { ThemeType } from './type';
import { ObjectLiteral } from '../type';

const edgeValue = 0.05;

export const getBreakpointCodeByWidth = (
    theme: ThemeType,
    width: number,
): string => {
    const {
        cache: {
            breakpoints: { keys, values },
        },
    } = theme;

    if (width <= 0) {
        return keys[0];
    }

    if (width >= values[values.length - 1]) {
        return keys[keys.length - 1];
    }

    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];

        if (width >= values[i] && width < values[i + 1]) {
            return key;
        }
    }

    return '';
};

export const breakpointUp = (
    theme: ThemeType,
    breakpoint: string,
    prefix = '@media ',
) => {
    const { values, unit } = theme.breakpoints;

    if (!(breakpoint in values)) {
        return '';
    }

    return `${prefix}(min-width:${values[breakpoint]}${unit})`;
};

export const breakpointDown = (
    theme: ThemeType,
    breakpoint: string,
    prefix = '@media ',
) => {
    const { keys } = theme.cache.breakpoints;
    const { values, unit } = theme.breakpoints;

    if (!(breakpoint in values)) {
        return '';
    }

    const rightIndex = keys.indexOf(breakpoint) + 1;
    const rightValue = values[keys[rightIndex]];

    if (rightIndex === keys.length) {
        // xl down applies to all sizes
        return breakpointUp(theme, 'xs', prefix);
    }

    if (!(typeof rightValue !== 'undefined' && rightIndex > 0)) {
        return '';
    }

    return `${prefix}(max-width:${rightValue - edgeValue}${unit})`;
};

export const breakpointBetween = (
    theme: ThemeType,
    breakpointStart: string,
    breakpointEnd: string,
    prefix = '@media ',
) => {
    const { keys } = theme.cache.breakpoints;
    const { values, unit } = theme.breakpoints;

    const rightIndex = keys.indexOf(breakpointEnd);

    if (rightIndex === keys.length - 1) {
        return breakpointUp(theme, breakpointStart, prefix);
    }

    return `${prefix}(min-width:${
        values[breakpointStart]
    }${unit}) and (max-width:${
        values[keys[rightIndex + 1]] - edgeValue
    }${unit})`;
};

export const breakpointOnly = (
    theme: ThemeType,
    breakpoint: string,
    prefix = '@media ',
) => breakpointBetween(theme, breakpoint, breakpoint, prefix);

export const media = (theme: ThemeType, config: ObjectLiteral) =>
    Object.keys(config).reduce((result, rule) => {
        const css = config[rule];
        if (rule[0] === '>') {
            const bp = rule.substr(1);
            result += `${breakpointUp(theme, bp)} { ${css} }; `;
        } else if (rule[0] === '<') {
            const bp = rule.substr(1);
            result += `${breakpointDown(theme, bp)} { ${css} }; `;
        } else {
            result += `${breakpointOnly(theme, rule)} { ${css} }; `;
        }

        return result;
    }, '');
