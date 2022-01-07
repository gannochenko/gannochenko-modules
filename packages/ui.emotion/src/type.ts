export interface ObjectLiteralType<P = any> {
    [k: string]: P;
}

export type ScalarType = string | number;

export type MUIThemeType = {
    breakpoints: {
        up: (bp: string) => string;
        down: (bp: string) => string;
        between: (bp: string, bpe: string) => string;
    };
    spacing: (value: number) => number | string;
    tokenIndex: ObjectLiteralType;
} & ObjectLiteralType;

export type StylePropsType<T = MUIThemeType> = {
    theme?: T;
};

export type BreakpointNameType = 'lg' | 'sm' | 'md' | 'xs' | 'xl';
