import { ScalarType } from '../type';
import { op } from './op';

export const rectangle = (
    height: ScalarType | null = null,
    width: ScalarType | null = null,
    k?: number,
) => {
    let realHeight = height;
    let realWidth = width;

    if (realHeight === null) {
        realHeight = realWidth;
    } else if (realWidth === null) {
        realWidth = realHeight;
    }

    const realCoefficient = k ?? 1;
    if (realCoefficient !== 1) {
        realWidth = op(width, (v: number) => v * realCoefficient);
        realHeight = op(height, (v: number) => v * realCoefficient);
    }

    return `
        ${realWidth !== null ? `width: ${realWidth};` : ''}
        ${realHeight !== null ? `height: ${realHeight};` : ''}
    `;
};
