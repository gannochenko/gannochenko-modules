import { makeTheme } from '../make-theme';
import {
    breakpointUp,
    breakpointDown,
    breakpointOnly,
    breakpointBetween,
    getBreakpointCodeByWidth,
} from '../media';

const theme = makeTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 770,
            md: 990,
            lg: 1200,
        },
    },
});

describe('media', () => {
    describe('breakpointUp()', () => {
        it('should handle lowest value', async () => {
            const result = breakpointUp(theme, 'xs');
            expect(result).toEqual('@media (min-width:0px)');
        });
        it('should handle highest value', async () => {
            const result = breakpointUp(theme, 'lg');
            expect(result).toEqual('@media (min-width:1200px)');
        });
        it('should handle value in between', async () => {
            const result = breakpointUp(theme, 'sm');
            expect(result).toEqual('@media (min-width:770px)');
        });
    });
    describe('breakpointDown()', () => {
        it('should handle lowest value', async () => {
            const result = breakpointDown(theme, 'xs');
            expect(result).toEqual('@media (max-width:769.95px)');
        });
        it('should handle highest value', async () => {
            const result = breakpointDown(theme, 'lg');
            expect(result).toEqual('@media (min-width:0px)');
        });
        it('should handle value in between', async () => {
            const result = breakpointDown(theme, 'sm');
            expect(result).toEqual('@media (max-width:989.95px)');
        });
    });
    describe('breakpointOnly()', () => {
        it('should handle lowest value', async () => {
            const result = breakpointOnly(theme, 'xs');
            expect(result).toEqual(
                '@media (min-width:0px) and (max-width:769.95px)',
            );
        });
        it('should handle highest value', async () => {
            const result = breakpointOnly(theme, 'lg');
            expect(result).toEqual('@media (min-width:1200px)');
        });
        it('should handle value in between', async () => {
            const result = breakpointOnly(theme, 'sm');
            expect(result).toEqual(
                '@media (min-width:770px) and (max-width:989.95px)',
            );
        });
    });
    describe('breakpointBetween()', () => {
        it('should entire range', async () => {
            const result = breakpointBetween(theme, 'xs', 'lg');
            expect(result).toEqual('@media (min-width:0px)');
        });
        it('should inner range', async () => {
            const result = breakpointBetween(theme, 'sm', 'md');
            expect(result).toEqual(
                '@media (min-width:770px) and (max-width:1199.95px)',
            );
        });
        it('should left range', async () => {
            const result = breakpointBetween(theme, 'xs', 'sm');
            expect(result).toEqual(
                '@media (min-width:0px) and (max-width:989.95px)',
            );
        });
        it('should right range', async () => {
            const result = breakpointBetween(theme, 'md', 'lg');
            expect(result).toEqual('@media (min-width:990px)');
        });
    });
    describe('getBreakpointCodeByWidth()', () => {
        it('should handle negative value', async () => {
            const result = getBreakpointCodeByWidth(theme, -10);
            expect(result).toEqual('xs');
        });
        it('should handle zero value', async () => {
            const result = getBreakpointCodeByWidth(theme, 0);
            expect(result).toEqual('xs');
        });
        it('should handle small value', async () => {
            const result = getBreakpointCodeByWidth(theme, 100);
            expect(result).toEqual('xs');
        });
        it('should handle medium value', async () => {
            const result = getBreakpointCodeByWidth(theme, 850);
            expect(result).toEqual('sm');
        });
        it('should handle big value', async () => {
            const result = getBreakpointCodeByWidth(theme, 1100);
            expect(result).toEqual('md');
        });
        it('should handle biggest value', async () => {
            const result = getBreakpointCodeByWidth(theme, 1200);
            expect(result).toEqual('lg');
        });
        it('should handle huge value', async () => {
            const result = getBreakpointCodeByWidth(theme, 999999);
            expect(result).toEqual('lg');
        });
        it('should handle edge value', async () => {
            const result = getBreakpointCodeByWidth(theme, 770);
            expect(result).toEqual('sm');
        });
    });
});
