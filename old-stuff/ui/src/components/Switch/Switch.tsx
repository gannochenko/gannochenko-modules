import React, {
    FunctionComponent,
    ReactElement,
    ReactNode,
    useMemo,
} from 'react';

import { matchPath, __RouterContext } from 'react-router';

import { SwitchPropsType, Match, RendererType, RouteType } from './type';
import { Nullable } from '../../type';

const SwitchRenderer: FunctionComponent<{
    locationPathname: string;
    children: ReactNode;
}> = ({ locationPathname, children }) => {
    const match = useMemo<Nullable<Match>>(() => {
        let component: Nullable<RendererType> = null;
        let route: Nullable<RouteType> = null;

        let notFoundPath: Nullable<ReactElement> = null;

        React.Children.forEach(children, (child) => {
            if (route === null && React.isValidElement(child)) {
                component = child.props.renderer as RendererType;
                route = matchPath(locationPathname, child.props);

                if (!child.props.path) {
                    notFoundPath = child;
                }
            }
        });

        if (!component || !route) {
            if (notFoundPath) {
                component = (notFoundPath as ReactElement).props
                    .renderer as RendererType;
                route = {
                    params: {},
                    isExact: false,
                    path: locationPathname,
                    url: locationPathname,
                };
            } else {
                return null;
            }
        }

        return {
            component,
            route,
        };
    }, [children, locationPathname]);

    if (!match) {
        return null;
    }

    return match.component({ route: match.route });
};

export const Switch: FunctionComponent<SwitchPropsType> = ({ children }) => {
    return (
        <__RouterContext.Consumer>
            {(context) => (
                <SwitchRenderer locationPathname={context.location.pathname}>
                    {children}
                </SwitchRenderer>
            )}
        </__RouterContext.Consumer>
    );
};
