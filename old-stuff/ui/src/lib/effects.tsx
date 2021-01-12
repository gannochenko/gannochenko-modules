import React, {
    FunctionComponent,
    useState,
    useEffect,
    useMemo,
    ReactNode,
} from 'react';
import EventEmitter from 'events';
import { throttle } from 'throttle-debounce';

const EVENT_EFFECT_RUN = 'enableEffect.run';
const EVENT_ELEMENT_READY = 'element.ready';
const EFFECT_DATA_ATTRIBUTE = 'data-effects-node-id';
const EFFECT_SELECTOR = 'effects-node';

type WindowWithIds = typeof window & { __effectIds: string[] };
type ElementWithDataset = Element & { dataset: { effectsNodeId: string } };

export interface EffectRuntimeProperties {
    [EFFECT_DATA_ATTRIBUTE]: string;
    className: string;
    runEffect: boolean;
}

export type StandardEffects =
    | 'fade-slide-left'
    | 'fade-slide-right'
    | 'fade-slide-top'
    | 'fade-slide-bottom'
    | 'fade-enter';

export interface EffectProperties {
    effectName?: StandardEffects;
    effectTimeout?: number;
    effectDurationA?: number;
    effectDurationB?: number;
    effectEaseA?: string;
    effectEaseB?: string;
    effectParameterA?: string;
    effectParameterB?: string;
    runEffect?: boolean;
    children?: ReactNode;
}
// @ts-ignore
export const effectEventEmitter = new EventEmitter();
const IDGenerator = function* () {
    while (true) {
        // @ts-ignore
        if (
            typeof window !== 'undefined' &&
            (window as WindowWithIds).__effectIds &&
            (window as WindowWithIds).__effectIds.length
        ) {
            yield (window as WindowWithIds).__effectIds.shift()!;
        } else {
            yield (Math.random() * 100000000000000000).toString();
        }
    }
};

const idGenerator = IDGenerator();

interface EffectHOCProps {
    children: any;
    effectTimeout?: number;
}

const EffectRunner: FunctionComponent<EffectHOCProps> = ({
    children,
    effectTimeout = 0,
}) => {
    const nodeId = useMemo(() => {
        return idGenerator.next().value;
    }, []);
    const [runEffect, setRunEffect] = useState(false);

    const onEventFire = (id: string) => {
        if (id.toString() === nodeId.toString()) {
            setTimeout(() => setRunEffect(true), effectTimeout);
            effectEventEmitter.off(EVENT_EFFECT_RUN, onEventFire);
        }
    };

    useEffect(() => {
        effectEventEmitter.on(EVENT_EFFECT_RUN, onEventFire);
        return () => {
            effectEventEmitter.off(EVENT_EFFECT_RUN, onEventFire);
        };
    }, [effectEventEmitter, onEventFire]);

    const effectProps = useMemo(
        () => ({
            [EFFECT_DATA_ATTRIBUTE]: nodeId,
            className: EFFECT_SELECTOR,
            runEffect,
        }),
        [runEffect, nodeId],
    );

    const html = children(effectProps);

    useEffect(() => {
        setTimeout(
            () => effectEventEmitter.emit(EVENT_ELEMENT_READY, [nodeId]),
            100,
        );
    }, []);

    return html;
};

const easeBounce = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';

export const runStandardEffect = ({
    effectName = 'fade-slide-top',
    effectDurationA = 300,
    effectDurationB,
    effectEaseA = 'preset:bounce',
    effectEaseB,
    effectParameterA = '',
    // effectParameterB = '',
    runEffect = false,
}: EffectProperties) => {
    effectParameterA = effectParameterA || '20';

    if (effectEaseB === undefined) {
        effectEaseB = effectEaseA;
    }
    if (effectDurationB === undefined) {
        effectDurationB = effectDurationA;
    }

    if (effectEaseA === 'preset:bounce') {
        effectEaseA = easeBounce;
    }
    if (effectEaseB === 'preset:bounce') {
        effectEaseB = easeBounce;
    }

    if (effectName.startsWith('fade-slide')) {
        let start = `opacity: 0; transform: translateY(-${effectParameterA}px);`;
        let end = 'opacity: 1; transform: translateY(0);';

        if (effectName === 'fade-slide-left') {
            start = `opacity: 0; transform: translateX(-${effectParameterA}px);`;
            end = 'opacity: 1; transform: translateX(0);';
        } else if (effectName === 'fade-slide-right') {
            start = `opacity: 0; transform: translateX(${effectParameterA}px);`;
            end = 'opacity: 1; transform: translateX(0);';
        } else if (effectName === 'fade-slide-bottom') {
            start = `opacity: 0; transform: translateY(${effectParameterA}px);`;
            end = 'opacity: 1; transform: translateY(0);';
        }

        return `
            transition: opacity ${effectEaseA} ${effectDurationA}ms, transform ${effectEaseB} ${effectDurationB}ms;
            ${start};
            ${runEffect ? end : ''}
        `;
    }

    if (effectName === 'fade-enter') {
        const start = `opacity: 0; transform: scale(0.8);`;
        const end = 'opacity: 1; transform: scale(1);';

        return `
            transition: opacity ${effectEaseA} ${effectDurationA}ms, transform ${effectEaseB} ${effectDurationB}ms;
            ${start};
            ${runEffect ? end : ''}
        `;
    }

    return '';
};

export const withEffects = (Component: any) => {
    const WithEffects = (props: EffectProperties) => {
        return (
            <EffectRunner effectTimeout={props.effectTimeout || 0}>
                {(effectRuntimeProps: EffectRuntimeProperties) => {
                    const runEffect = () =>
                        runStandardEffect({
                            runEffect: effectRuntimeProps.runEffect,
                            ...props,
                        });
                    return (
                        <Component
                            {...props}
                            {...effectRuntimeProps}
                            runStandardEffect={runEffect}
                        />
                    );
                }}
            </EffectRunner>
        );
    };

    const wrappedComponentName =
        Component.displayName || Component.name || 'Component';

    WithEffects.displayName = `withEffects(${wrappedComponentName})`;
    return WithEffects;
};

// returns all items present on the current page
const getItems = () =>
    document.querySelectorAll(`.${EFFECT_SELECTOR}`) as NodeListOf<
        ElementWithDataset
    >;

const processNode = (
    node: ElementWithDataset,
    id?: string,
    windowScrollTop?: number,
    windowBottom?: number,
) => {
    if (!id) {
        id = node.dataset.effectsNodeId;
    }

    if (windowScrollTop === undefined) {
        windowScrollTop = window.scrollY || window.pageYOffset;
    }

    if (windowBottom === undefined) {
        windowBottom = window.innerHeight + windowScrollTop;
    }

    const itemRect = node.getBoundingClientRect();
    const itemTop = itemRect.top + windowScrollTop;
    if (itemTop + Math.min(itemRect.height * 0.2, 200) < windowBottom) {
        node.classList.remove(EFFECT_SELECTOR);
        effectEventEmitter.emit(EVENT_EFFECT_RUN, [id]);
    }
};

const onWindowUpdate = throttle(200, () => {
    const windowScrollTop = window.scrollY || window.pageYOffset;
    const windowBottom = window.innerHeight + windowScrollTop;

    const items = getItems();
    for (let i = 0; i < items.length; i += 1) {
        processNode(items[i], undefined, windowScrollTop, windowBottom);
    }
});

export const startEffects = () => {
    window.addEventListener('resize', onWindowUpdate, true);
    window.addEventListener('scroll', onWindowUpdate, true);

    effectEventEmitter.on(EVENT_ELEMENT_READY, ([id]: string[]) => {
        const node = document.querySelector(
            `[${EFFECT_DATA_ATTRIBUTE}="${id}"]`,
        ) as ElementWithDataset;
        if (node) {
            processNode(node);
        }
    });
};

export const stopEffects = () => {
    window.removeEventListener('resize', onWindowUpdate);
    window.removeEventListener('scroll', onWindowUpdate);
};

export const getRenderedEffectNodeIdCollector = () => (
    <script
        key="effects"
        dangerouslySetInnerHTML={{
            __html: `window.__effectIds = Array.from(document.querySelectorAll('.${EFFECT_SELECTOR}')).map(node => node.dataset.effectsNodeId);`,
        }}
    />
);
