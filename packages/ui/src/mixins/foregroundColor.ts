import { transition } from './transition';

export const foregroundColor = (
    color = 'inherit',
    hoverColor?: string,
    transitionTime = 0,
) => `
    color: ${color};
    ${color !== hoverColor ? `&:hover { color: ${hoverColor}; }` : ''};
    ${transition('color', transitionTime)};
`;
