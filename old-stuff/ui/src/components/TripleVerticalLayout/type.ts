import { HTMLAttributes, ReactNode } from 'react';

export type TripleVerticalLayoutPropsType = {
    header?: ReactNode;
    footer?: ReactNode;
} & HTMLAttributes<HTMLElement>;
