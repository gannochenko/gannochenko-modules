import { css } from '@emotion/react';
import { ScalarType, StylePropsType } from '../type';
import { getStyleFor } from './utils';

export type PaddingPropsType = Partial<{
    padding: ScalarType;
    paddingTop: ScalarType;
    paddingBottom: ScalarType;
    paddingLeft: ScalarType;
    paddingRight: ScalarType;
}> &
    StylePropsType;

export const paddingProps = ({
    padding: allPadding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    theme,
}: PaddingPropsType) => css`
    ${getStyleFor('padding', allPadding, theme)};
    ${getStyleFor('padding-top', paddingTop, theme)};
    ${getStyleFor('padding-bottom', paddingBottom, theme)};
    ${getStyleFor('padding-left', paddingLeft, theme)};
    ${getStyleFor('padding-right', paddingRight, theme)};
`;
