import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
// eslint-disable-next-line import/no-unresolved
import { action } from '@storybook/addon-actions';

import { PageLoadProgress } from '../PageLoadProgress';

export default {
    title: 'components/PageLoadProgress',
    component: PageLoadProgress,
    decorators: [withKnobs],
    parameters: {},
};

export const Basic = () => (
    <PageLoadProgress state={{}}>
        {() => text('Content', 'Hello, world!')}
    </PageLoadProgress>
);
