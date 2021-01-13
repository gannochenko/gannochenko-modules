import { StylePropsType } from '../../type';

export const muiToken = (tokenName: string) => ({ theme }: StylePropsType) =>
    tokenName in theme.tokenIndex ? theme.tokenIndex[tokenName] : null;
