export const isChildForNode = (node: HTMLElement, parent: HTMLElement) => {
    let next = node;
    while (next) {
        if (next === parent) {
            return true;
        }

        if (!next.parentElement) {
            return false;
        }
        next = next.parentElement;
    }

    return false;
};
