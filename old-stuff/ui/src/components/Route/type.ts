import { RendererType } from '../Switch/type';

export type RoutePropsType = {
    exact?: boolean;
    path?: string;
    renderer: RendererType;
};
