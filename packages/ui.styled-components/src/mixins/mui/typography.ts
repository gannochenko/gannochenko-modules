import { StylePropsType } from '../../type';

export const muiTypography = (typographyName: string) => ({
    theme,
}: StylePropsType) => {
    if (theme.typography && typographyName in theme.typography) {
        // @ts-ignore
        return theme.typography[typographyName];
    }
    return '';
};
