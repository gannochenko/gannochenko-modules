import { ReactElement, ReactNode } from 'react';
import { match } from 'react-router';

import { ObjectLiteral } from '../../type';

export type SwitchPropsType = {
    children?: ReactNode;
};

export type RouteType = match<ObjectLiteral>;

export type RendererType = (props: { route: RouteType }) => ReactElement;

export type Match = {
    component: RendererType;
    route: RouteType;
};
