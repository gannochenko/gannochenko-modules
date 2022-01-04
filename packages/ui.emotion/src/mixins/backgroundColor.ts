import { css } from '@emotion/react';
import { transition } from './transition';
import { ScalarType } from '../type';

export const backgroundColor = (
    color = 'inherit',
    hoverColor?: string,
    focusColor?: string,
    transitionTime: ScalarType = 0,
) => css`
    background-color: ${color};
    &:hover {
        background-color: ${hoverColor || color};
    }
    &:focus {
        background-color: ${focusColor || color};
    }

    ${transition('background-color', transitionTime)}
`;
