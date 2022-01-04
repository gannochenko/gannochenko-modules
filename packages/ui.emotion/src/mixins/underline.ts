import { transition } from './transition';
import { ScalarType } from '../type';

export const underline = (
    mode = 'on-hover',
    transitionTime: ScalarType = 0,
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
