import { StylePropsType } from '../../type';

export const muiTypography =
    (typographyName: string) =>
    ({ theme }: StylePropsType) => {
        if (theme?.typography && typographyName in theme.typography) {
            return theme.typography[typographyName];
        }
        return '';
    };
