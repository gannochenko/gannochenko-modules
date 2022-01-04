import { transition } from './transition';
import { ScalarType } from '../type';

export const foregroundColor = (
    color = 'inherit',
    hoverColor?: string,
    transitionTime: ScalarType = 0,
) => `
    color: ${color};
    ${color !== hoverColor ? `&:hover { color: ${hoverColor}; }` : ''};
    ${transition('color', transitionTime)};
`;
