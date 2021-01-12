import { ObjectLiteral } from '../type';
import { ThemeType } from './type';
import { op } from '../util';

const toHalf = (x: number) => x / 2;
const negate = (x: number) => x * -1;
const makeConstraintMix = (width: string) => {
    return `
        flex-basis: ${width};
        width: ${width};
    `;
};
const calcWidth = (width: number, resolution: number) =>
    Math.floor((width / resolution) * 1000) * 0.1;

export const grid = (theme: ThemeType, config: ObjectLiteral) => {
    let cssSelf = '';
    let cssChildren = '';

    // gutters
    const guttersH = (config.guttersH ||
        config.guttersY ||
        config.gutters) as ObjectLiteral;
    const guttersW = (config.guttersW ||
        config.guttersX ||
        config.gutters) as ObjectLiteral;

    if (guttersH || guttersW) {
        if (guttersW && 'all' in guttersW) {
            const gutter = guttersW.all;
            const gutterHalf = op(gutter, toHalf);
            const gutterHalfNeg = op(gutterHalf, negate);
            cssSelf += `
                margin-left: ${gutterHalfNeg};
                margin-right: ${gutterHalfNeg};
            `;
            cssChildren += `
                padding-left: ${gutterHalf};
                padding-right: ${gutterHalf};
            `;
        }

        if (guttersH && 'all' in guttersH) {
            const gutter = guttersH.all;
            const gutterNeg = op(gutter, negate);
            cssSelf += `
                margin-bottom: ${gutterNeg};
            `;
            cssChildren += `
                padding-bottom: ${gutter};
            `;
        }

        theme.cache.breakpoints.keys.forEach((bp) => {
            const media = theme.util.breakpointOnly(bp, '');

            if (guttersW) {
                if (bp in guttersW) {
                    const gutter = guttersW[bp];
                    const gutterHalf = op(gutter, toHalf);
                    const gutterHalfNeg = op(gutterHalf, negate);
                    cssSelf += `
                        @media screen and ${media} {
                            margin-left: ${gutterHalfNeg};
                            margin-right: ${gutterHalfNeg};
                        };
                    `;
                    cssChildren += `
                        @media screen and ${media} {
                            padding-left: ${gutterHalf};
                            padding-right: ${gutterHalf};
                        }
                    `;
                }
            }

            if (guttersH) {
                if (bp in guttersH) {
                    const gutter = guttersH[bp];
                    const gutterNeg = op(gutter, negate);
                    cssSelf += `
                        @media screen and ${media} {
                            margin-bottom: ${gutterNeg};
                        }
                    `;
                    cssChildren += `
                        @media screen and ${media} {
                            padding-bottom: ${gutter};
                        }
                    `;
                }
            }
        });
    }

    return `
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        ${cssSelf}
        & > * {
            ${cssChildren}
        }
    `;
};

export const cell = (theme: ThemeType, config: ObjectLiteral) => {
    let result = '';

    const {
        grid: { resolution },
    } = theme;

    theme.cache.breakpoints.keys.forEach((bp) => {
        const media = theme.util.breakpointOnly(bp, '');

        let width = '';
        if (bp in config) {
            width = makeConstraintMix(
                `${calcWidth(config[bp] as number, resolution as number)}%`,
            );
        } else {
            width = makeConstraintMix(
                'all' in config
                    ? `${calcWidth(
                          config.all as number,
                          resolution as number,
                      )}%`
                    : 'auto',
            );
        }

        result += `
            @media screen and ${media} { ${width} }
        `;
    });

    return result;
};
