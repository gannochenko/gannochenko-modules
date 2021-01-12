import { ScalarType } from '../type';

export const gutter = (
    x?: ScalarType,
    y?: ScalarType,
) => {
    return `
        & > * {
            ${x !== undefined ? `margin-bottom: ${x};` : ''};
            ${y !== undefined ? `margin-right: ${y};` : ''}
        }
    
        ${x !== undefined ? `margin-bottom: -${x};` : ''}
        ${y !== undefined ? `margin-right: -${y};` : ''}
    `;
};
