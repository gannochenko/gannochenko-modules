import { ScalarType, StylePropsType } from '../../type';

export const muiSpacing = (value: ScalarType) => ({ theme }: StylePropsType) => {
    if (typeof value === 'string') {
        return value;
    }
    return `${theme.spacing(value)}px`;
};
