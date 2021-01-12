import { op } from '../util';
import { Nullable, Scalar } from '../type';

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

const trans = (what: string, duration: Scalar) => {
    if (duration <= 0) {
        return '';
    }
    return `transition: ${what} ${duration} ease`;
};

const j = (how: Nullable<Alignment>) => {
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
    y: Nullable<Alignment> = null,
    x: Nullable<Alignment> = null,
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

export const round = () => `
    border-radius: 99999rem;
`;

export const rectangle = (
    height: Nullable<Scalar> = null,
    width: Nullable<Scalar> = null,
    k: Nullable<number> = null,
) => {
    if (height === null) {
        height = width;
    } else if (width === null) {
        width = height;
    }

    if (k !== null) {
        width = op(width, (v: number) => v * k);
        height = op(height, (v: number) => v * k);
    }

    return `
        ${width !== null ? `width: ${width};` : ''}
        ${height !== null ? `height: ${height};` : ''}
    `;
};

/**
 * Group does not care whether there are inline or block elements, or flex-boxes.
 */
export const gap = (
    hOffs: Nullable<Scalar> = null,
    wOffs: Nullable<Scalar> = null,
) => {
    return `
        & > * {
            ${hOffs !== null ? `margin-bottom: ${hOffs};` : ''};
            ${wOffs !== null ? `margin-right: ${wOffs};` : ''}
        }
    
        ${hOffs !== null ? `margin-bottom: -${hOffs};` : ''}
        ${wOffs !== null ? `margin-right: -${wOffs};` : ''}
    `;
};

export const central = (maxWidth: Scalar = '960px') => `
    margin-left: auto;
    margin-right: auto;
    max-width: ${maxWidth};
`;

export const centralColumn = (
    maxWidth: Scalar = '960px',
    gutter: Scalar = '1rem',
) => `
    ${central(maxWidth)}
    min-width: 320px;
    height: 100vh;
    ${gutter ? `padding-left: ${gutter}; padding-right: ${gutter}` : ''}
    box-sizing: border-box;
`;

export const mirror = () => `
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
`;

export const fontReset = () => `
    font-style: normal;
    letter-spacing: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
`;

export const ellipsis = () => `
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
`;

export const backgroundCover = (image: Nullable<string> = null) => `
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: scroll;
    
    ${image ? `background-image: url(${image});` : ''}
`;

export const foregroundColor = (
    color = 'inherit',
    hoverColor: Nullable<string> = null,
    transitionTime: Scalar = 0,
) => `
    color: ${color};
    ${color !== hoverColor ? `&:hover { color: ${hoverColor}; }` : ''}
    ${trans('color', transitionTime)}
`;

export const backgroundColor = (
    color = 'inherit',
    hoverColor: Nullable<string> = null,
    focusColor: Nullable<string> = null,
    transitionTime: Scalar = 0,
) => `
    background-color: ${color};
    &:hover {
      background-color: ${hoverColor || color};
    }
    &:focus {
      background-color: ${focusColor || color};
    }

    ${trans('background-color', transitionTime)}
`;

export const borderColor = (
    hout?: Nullable<string>,
    hover?: Nullable<string>,
) => `
	${hout ? `border-color: ${hout};` : ''}
	${
        hover
            ? `&:hover { border-color: ${hover}; transition: border-color 200ms ease;}`
            : ''
    }
`;

export const underline = (
    mode = 'on-hover',
    thickness = '1px',
    color = 'currentcolor',
    transitionTime: Scalar = 0,
) => `
    ${
        mode === 'on-hover'
            ? `
          border: 0 none;
          border-bottom: ${thickness} dashed transparent;
          &:hover {
            border-bottom: ${thickness} dashed ${color};
          }
        `
            : ''
    }

    ${trans('border-color', transitionTime)}
`;

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

export const heightTrick = () => `
    position: relative;
    width: 100%;
  
    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    > * {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
`;

export const fixedCover = () => `
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

export const absoluteCover = () => `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

export const icon = (
    code = 'help',
    size: Scalar = 'inherit',
    offset: Scalar = 0,
) => `
    height: ${size};
    width: ${size};
    font-size: ${size};
    line-height: 100%;
    box-sizing: content-box;

    padding: ${offset};
    ::before {
        content: '${code}';
        height: ${size};
        width: ${size};
        display: block;
        text-transform: none;
        line-height: 100%;
    }

    font-family: Material Icons, sans-serif;
`;

export const iconLabel = (
    code = 'help',
    size: Scalar = 'inherit',
    iconVAlignment: Scalar | 'baseline' = 'baseline',
    iconHAlignment: Scalar | 'baseline' = 0,
    iconWidth: Scalar | 'auto' = 'auto',
    distance: Scalar = 0,
) => `
    display: flex;
    ${iconVAlignment === 'baseline' ? 'align-items: baseline' : ''}
    
    ::before {
        content: '${code}';
        flex-shrink: 0;
        padding-right: ${distance};
        font-family: Material Icons, sans-serif;
        ${fontReset()}
        text-transform: none;
        font-size: ${size};
        text-align: center;
        width: ${iconWidth};
        line-height: 100%;
    
        ${iconVAlignment !== 'baseline' ? `margin-top: ${iconVAlignment}` : ''}
        ${
            iconHAlignment !== 'baseline'
                ? `margin-bottom: ${iconHAlignment}`
                : ''
        }
    }
`;
