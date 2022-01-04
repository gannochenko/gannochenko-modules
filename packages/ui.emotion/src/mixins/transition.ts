import { ScalarType } from '../type';

export const transition = (what: string, duration: ScalarType) => {
    if (duration <= 0) {
        return '';
    }
    return `transition: ${what} ${typeof duration === 'number' ? `${duration}s` : duration} ease`;
};
