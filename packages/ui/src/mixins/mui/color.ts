import { StylePropsType } from '../../type';

export const muiColor = (colorTokenName: string) => ({
    theme,
}: StylePropsType) => {
    const tokenName = `palette.${colorTokenName}`;
    return tokenName in theme.tokenIndex
        ? (theme.tokenIndex[tokenName] as string)
        : '';
};
