import React, {
    FunctionComponent,
    useRef,
    useCallback,
    useEffect,
} from 'react';

import { ScrollPanelRoot, Inner } from './style';
import { ScrollPanelPropsType } from './type';

const getHeight = (element: HTMLElement) =>
    element.getBoundingClientRect().height;

export const ScrollPanel: FunctionComponent<ScrollPanelPropsType> = ({
    children,
    ...restProps
}) => {
    const inner = useRef<HTMLDivElement>() as React.MutableRefObject<
        HTMLDivElement
    >;
    const outer = useRef<HTMLDivElement>() as React.MutableRefObject<
        HTMLDivElement
    >;
    const onWheel = useCallback(
        (event: WheelEvent) => {
            const outerNode = outer.current;
            const innerNode = inner.current;

            const bH = getHeight(innerNode);
            if (bH === 0) {
                console.error('ScrollPane: inner node has zero height.'); // eslint-disable-line no-console
            }

            const oH = getHeight(outerNode);
            if (bH <= oH) {
                return;
            }

            // blocking scroll up
            if (event.deltaY < 0 && outerNode.scrollTop <= 0) {
                event.preventDefault();
                return;
            }

            // blocking scroll down
            if (event.deltaY > 0) {
                if (outerNode.scrollTop + getHeight(outerNode) >= bH) {
                    event.preventDefault();
                }
            }
        },
        [outer, inner],
    );

    useEffect(() => {
        if (outer.current) {
            outer.current.addEventListener('wheel', onWheel);
        }

        return () => {
            if (outer.current) {
                outer.current.removeEventListener('wheel', onWheel);
            }
        };
    }, [outer]);

    return (
        <ScrollPanelRoot {...restProps} ref={outer}>
            <Inner ref={inner}>{children()}</Inner>
        </ScrollPanelRoot>
    );
};
