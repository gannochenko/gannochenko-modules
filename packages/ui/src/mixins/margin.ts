import { css } from 'styled-components';
import { ObjectLiteralType } from '../type';

export type ScalarType = string | number;
export type MarginPropsType = Partial<{
    margin: ScalarType;
    marginTop: ScalarType;
    marginBottom: ScalarType;
    marginLeft: ScalarType;
    marginRight: ScalarType;
    theme: ObjectLiteralType;
}>;

const getValue = (value?: ScalarType, theme?: ObjectLiteralType) => {
    if (typeof value === 'string') {
        return value;
    }
    // in case of number, can do something fun here,
    // like converting spacing unit to pixels, or pixels to rem

    // MUI support
    if (theme && typeof theme.spacing === 'function') {
        return theme.spacing(value);
    }

    return value;
};

const getStyleFor = (property: string, value?: ScalarType, theme?: ObjectLiteralType) =>
    value !== undefined ? `${property}: ${getValue(value, theme)};` : '';

export const margin = ({
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    theme,
}: MarginPropsType) => css`
    ${getStyleFor('margin', margin, theme)};
    ${getStyleFor('margin-top', marginTop, theme)};
    ${getStyleFor('margin-bottom', marginBottom, theme)};
    ${getStyleFor('margin-left', marginLeft, theme)};
    ${getStyleFor('margin-right', marginRight, theme)};
`;
