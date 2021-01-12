import styled from 'styled-components';
import { runStandardEffect, withEffects } from '../../lib/effects';

export const EffectContainer = withEffects(styled.div`
    ${(props) => runStandardEffect(props)}
`);
