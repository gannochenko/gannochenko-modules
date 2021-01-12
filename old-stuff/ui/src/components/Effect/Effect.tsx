import React, { FunctionComponent } from 'react';

import { EffectContainer } from './style';
import { EffectPropsType } from './type';

export const Effect: FunctionComponent<EffectPropsType> = ({
    children,
    name = 'fade-slide-bottom',
    timeout,
    durationA = 300,
    durationB = 300,
    easeA = 'preset:bounce',
    easeB = 'preset:bounce',
    parameterA,
    parameterB,
}) => {
    return (
        <EffectContainer
            effectTimeout={timeout}
            effectName={name}
            effectDurationA={durationA}
            effectDurationB={durationB}
            effectEaseA={easeA}
            effectEaseB={easeB}
            effectParameterA={parameterA}
            effectParameterB={parameterB}
        >
            {children}
        </EffectContainer>
    );
};
