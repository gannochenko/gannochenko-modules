import { HTMLAttributes, ReactNode } from 'react';

export type ScrollPanelPropsType = {
    children: () => ReactNode;
    // custom props here
} & HTMLAttributes<HTMLElement>;
