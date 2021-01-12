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

const j = (how?: Alignment) => {
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

export const contentAlignment = (
    x?: Alignment,
    y?: Alignment,
    direction = 'row',
) => {
    x = j(x);
    y = j(y);
    if (direction === 'column' || direction === 'col') {
        return `
            display: flex;
            flex-direction: column;
            ${y !== null ? `justify-content: ${y};` : ''}
            ${x !== null ? `align-items: ${x};` : ''}
        `;
    }

    return `
        display: flex;
        flex-direction: row;
        ${x !== null ? `justify-content: ${x};` : ''}
        ${y !== null ? `align-items: ${y};` : ''}
    `;
};
