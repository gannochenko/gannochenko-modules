type Alignment =
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'middle'
    | 'flex-start'
    | 'flex-end'
    | 'center';

const translateAlignment = (how: Alignment | null) => {
    if (how === 'start' || how === 'left' || how === 'top') {
        return 'flex-start';
    }
    if (how === 'end' || how === 'right' || how === 'bottom') {
        return 'flex-end';
    }
    if (how === 'middle') {
        return 'center';
    }
    return how;
};

export const align = (
    y: Alignment | null = null,
    x: Alignment | null = null,
    direction = 'row',
) => {
    const alignmentX = translateAlignment(x);
    const alignmentY = translateAlignment(y);
    if (direction === 'column' || direction === 'col') {
        return `
            display: flex;
            flex-direction: column;
            ${alignmentY !== null ? `justify-content: ${alignmentY}` : ''}
            ${alignmentX !== null ? `align-items: ${alignmentX}` : ''}
        `;
    }

    return `
        display: flex;
        flex-direction: row;
        ${alignmentX !== null ? `justify-content: ${alignmentX}` : ''}
        ${alignmentY !== null ? `align-items: ${alignmentY}` : ''}
    `;
};
