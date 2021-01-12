import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
// eslint-disable-next-line import/no-unresolved
import { action } from '@storybook/addon-actions';

import { ScrollPanel } from '../ScrollPanel';

export default {
    title: 'components/ScrollPanel',
    component: ScrollPanel,
    decorators: [withKnobs],
    parameters: {},
};

export const Basic = () => (
    <ScrollPanel onClick={action('click!')}>
        {() => text('Content', 'Hello, world!')}
    </ScrollPanel>
);
