import { css } from '@emotion/react';
import { ObjectLiteralType, ScalarType } from '../type';
import { getStyleFor } from './utils';

export type MarginPropsType = Partial<{
    margin: ScalarType;
    marginTop: ScalarType;
    marginBottom: ScalarType;
    marginLeft: ScalarType;
    marginRight: ScalarType;
    theme: ObjectLiteralType;
}>;

export const marginProps = ({
    margin: allMargin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    theme,
}: MarginPropsType) => css`
    ${getStyleFor('margin', allMargin, theme)};
    ${getStyleFor('margin-top', marginTop, theme)};
    ${getStyleFor('margin-bottom', marginBottom, theme)};
    ${getStyleFor('margin-left', marginLeft, theme)};
    ${getStyleFor('margin-right', marginRight, theme)};
`;
