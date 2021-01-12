export type Nullable<X = any> = X | null;

export interface ObjectLiteral<P = any> {
    [k: string]: P;
}

export type Indexed<O, P = any> = O & ObjectLiteral<P>;

export interface ASTNode {
    fieldNodes: ASTNode[];
    selectionSet: {
        selections: ASTNode[];
    };
    name: {
        value: string;
    };
}

export type Scalar = string | number;
