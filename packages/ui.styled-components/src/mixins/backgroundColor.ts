import { css } from 'styled-components';
import { transition } from './transition';

export const backgroundColor = (
    color = 'inherit',
    hoverColor?: string,
    focusColor?: string,
    transitionTime = 0,
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
