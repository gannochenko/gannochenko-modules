import { addDecorator, addParameters } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';


import { defaultTheme } from "../../src/themes";


const themes = [
    {
        name: 'Default',
        backgroundColor: '#fff',
        ...defaultTheme,
    },
];

addDecorator(withThemesProvider(themes));

addParameters({
    viewport: {
        viewports: {
            ...INITIAL_VIEWPORTS,
        },
    },
});
