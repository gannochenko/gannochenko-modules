import { css } from 'styled-components';
import { ObjectLiteralType, ScalarType } from '../type';
import { getStyleFor } from './utils';

export type WidthPropsType = Partial<{
    width: ScalarType;
    maxWidth: ScalarType;
    minWidth: ScalarType;
    wide: boolean;
    theme: ObjectLiteralType;
}>;

export type HeightPropsType = Partial<{
    height: ScalarType;
    maxHeight: ScalarType;
    minHeight: ScalarType;
    tall: boolean;
    theme: ObjectLiteralType;
}>;

export const widthProps = ({
    width,
    maxWidth,
    minWidth,
    wide,
    theme,
}: WidthPropsType) => css`
    ${getStyleFor('width', width, theme)};
    ${getStyleFor('max-width', maxWidth, theme)};
    ${getStyleFor('min-width', minWidth, theme)};
    ${wide === true ? 'width: 100%;' : ''};
`;

export const heightProps = ({
    height,
    maxHeight,
    minHeight,
    tall,
    theme,
}: HeightPropsType) => css`
    ${getStyleFor('height', height, theme)};
    ${getStyleFor('max-height', maxHeight, theme)};
    ${getStyleFor('min-height', minHeight, theme)};
    ${tall === true ? 'height: 100%;' : ''};
`;
