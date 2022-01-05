import { StylePropsType } from '../../type';

export const muiToken =
    (tokenName: string) =>
    ({ theme }: StylePropsType) =>
        theme && tokenName in theme.tokenIndex
            ? theme.tokenIndex[tokenName]
            : null;
