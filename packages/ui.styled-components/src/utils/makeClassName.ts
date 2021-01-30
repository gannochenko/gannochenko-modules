export const makeClassName = (
    blockName: string,
    elementName = 'Root',
    modifier?: string,
) => `${blockName}-${elementName}${modifier ? `--${modifier}` : ''}`;
