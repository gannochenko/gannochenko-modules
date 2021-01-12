import { ReactNode } from 'react';
import { StandardEffects } from '../../lib';

export interface EffectPropsType {
    name?: StandardEffects;
    timeout?: number;
    durationA?: number;
    durationB?: number;
    easeA?: string;
    easeB?: string;
    parameterA?: string;
    parameterB?: string;
    children?: ReactNode;
}
