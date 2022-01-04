import { css } from '@emotion/react';

export const backgroundCover = (image?: string) => css`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: scroll;

    ${image
        ? css`
              background-image: url(${image});
          `
        : ''}
`;
