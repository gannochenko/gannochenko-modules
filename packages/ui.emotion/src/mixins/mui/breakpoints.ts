import { BreakpointNameType, StylePropsType } from '../../type';

export const muiBreakpointUp =
    (breakpointName: BreakpointNameType) =>
    ({ theme }: StylePropsType) =>
        theme?.breakpoints.up(breakpointName) ?? '';

export const muiBreakpointDown =
    (breakpointName: BreakpointNameType) =>
    ({ theme }: StylePropsType) =>
        theme?.breakpoints.down(breakpointName) ?? '';

export const muiBreakpointBetween =
    (
        breakpointStartName: BreakpointNameType,
        breakpointEndName: BreakpointNameType,
    ) =>
    ({ theme }: StylePropsType) =>
        theme?.breakpoints.between(breakpointStartName, breakpointEndName) ??
        '';
