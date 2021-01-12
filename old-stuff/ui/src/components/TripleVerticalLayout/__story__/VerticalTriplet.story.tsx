import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
// eslint-disable-next-line import/no-unresolved
import { action } from '@storybook/addon-actions';

import { TripleVerticalLayout } from '../TripleVerticalLayout';

export default {
    title: 'components/TripleVerticalLayout',
    component: TripleVerticalLayout,
    decorators: [withKnobs],
    parameters: {},
};

export const Basic = () => (
    <TripleVerticalLayout onClick={action('click!')}>
        {text('Content', 'Hello, world!')}
    </TripleVerticalLayout>
);
