import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
// eslint-disable-next-line import/no-unresolved
import { action } from '@storybook/addon-actions';

import { Notifications } from '../Notifications';

export default {
    title: 'components/Notifications',
    component: Notifications,
    decorators: [withKnobs],
    parameters: {},
};

export const Basic = () => (
    <Notifications onClick={action('click!')}>
        {() => text('Content', 'Hello, world!')}
    </Notifications>
);
