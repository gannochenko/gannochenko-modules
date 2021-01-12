export const textDecoration = (mode = 'on-hover', decoration = 'underline') => `
    ${
    mode === 'on-hover'
        ? `
            text-decoration: none;
            &:hover {
                text-decoration: ${decoration};
            };
        `
        : ''
    }
    ${
    mode === 'on-hout'
        ? `
            text-decoration: ${decoration};
            &:hover {
                text-decoration: none;
            }
        `
        : ''
    }
`;
