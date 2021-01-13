import { css } from 'styled-components';

export const ellipsis = () => css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
`;
