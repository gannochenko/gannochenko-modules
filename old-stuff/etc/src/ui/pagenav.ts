import { PageNavigationStructure } from './type';

const getPageCount = (count: number, pageSize: number) => {
    return Math.ceil(count / pageSize);
};

export const getPageNavigation = (
    count: number,
    page: number,
    pageSize = 10,
    radius = 2,
) => {
    const result: PageNavigationStructure = {
        pages: {
            backward: -1,
            forward: 1,
            range: [],
            count: 0,
            current: page,
        },
        arrows: {
            first: false,
            backward: false,
            forward: false,
            last: false,
        },
    };

    if (!count || count < pageSize) {
        return result;
    }

    const pageCount = getPageCount(count, pageSize);
    result.pages.count = pageCount;

    const range = [page - radius, page + radius];
    if (range[0] < 1) {
        range[1] += 1 - range[0];
        range[0] = 1;
        if (range[1] > pageCount) {
            range[1] = pageCount;
        }
    }

    if (range[1] > pageCount) {
        range[0] -= range[1] - pageCount;
        range[1] = pageCount;
        if (range[0] < 1) {
            range[0] = 1;
        }
    }

    for (let i = range[0]; i <= range[1]; i += 1) {
        result.pages.range.push(i);
    }

    result.pages.backward = page - 1;
    result.pages.forward = page + 1;

    result.arrows.first = page > 1;
    result.arrows.backward = page > 1;
    result.arrows.forward = page < pageCount;
    result.arrows.last = page < pageCount;

    return result;
};
