import React, { FunctionComponent } from 'react';

import { TripleVerticalLayoutRoot, Header, Main, Footer } from './style';
import { TripleVerticalLayoutPropsType } from './type';

export const TripleVerticalLayout: FunctionComponent<TripleVerticalLayoutPropsType> = ({
    children,
    header,
    footer,
    ...restProps
}) => {
    return (
        <TripleVerticalLayoutRoot {...restProps}>
            {!!header && <Header>{header}</Header>}
            <Main>{children}</Main>
            {!!footer && <Footer>{footer}</Footer>}
        </TripleVerticalLayoutRoot>
    );
};

TripleVerticalLayout.defaultProps = {
    header: null,
    footer: null,
    children: null,
};
