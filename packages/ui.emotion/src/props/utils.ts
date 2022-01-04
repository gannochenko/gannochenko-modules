import { ObjectLiteralType, ScalarType } from '../type';

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

export const getStyleFor = (
    property: string,
    value?: ScalarType,
    theme?: ObjectLiteralType,
) => (value !== undefined ? `${property}: ${getValue(value, theme)};` : '');
