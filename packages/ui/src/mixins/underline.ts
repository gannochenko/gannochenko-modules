import { transition } from './transition';

export const underline = (
    mode = 'on-hover',
    thickness = '1px',
    color = 'currentcolor',
    transitionTime = 0,
) => `
    ${
    mode === 'on-hover'
        ? `
          border: 0 none;
          border-bottom: ${thickness} dashed transparent;
          &:hover {
            border-bottom: ${thickness} dashed ${color};
          }
        `
        : ''
    }

    ${transition('border-color', transitionTime)};
`;
