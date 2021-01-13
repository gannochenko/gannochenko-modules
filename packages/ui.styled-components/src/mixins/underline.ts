import { transition } from './transition';

export const underline = (
    mode = 'on-hover',
    transitionTime = 0,
    thickness = '1px',
    color = 'currentcolor',
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

    ${transition('border-color', transitionTime)}
`;
