import moment from 'moment';
import { Nullable } from '../type';
import { TimeLineItemType } from './type';

/**
 * todo: get rid of moment here
 */
export const getCalendar = (
    date: Date,
    chosen: Nullable<Date> | Nullable<string> = null,
) => {
    let b = moment.utc(date);
    let f = moment.utc(date);

    const cMonth = f.month();
    const timeLine: TimeLineItemType[] = [];

    let isChosenMonthYear = false;
    let chosenMonth: Nullable<number> = null;
    let chosenYear: Nullable<number> = null;
    let chosenDay: Nullable<number> = null;

    if (chosen) {
        let chosenDate: Nullable<Date> = null;

        if (typeof chosen === 'string') {
            chosenDate = new Date(chosen);
        } else if (chosen instanceof Date) {
            chosenDate = chosen as Date;
        }

        if (chosenDate) {
            chosenMonth = chosenDate.getUTCMonth();
            chosenYear = chosenDate.getUTCFullYear();
            chosenDay = chosenDate.getUTCDate();
            isChosenMonthYear =
                b.month() === chosenMonth && b.year() === chosenYear;
        }
    }

    // generate our calendar grid backward
    let i = 0;
    let pad = 1;
    let decreasePad = false;
    while (i < 50) {
        b = b.add(-1, 'day');

        if (cMonth !== b.month() && !decreasePad) {
            // went out of the chosen month borders, now need to pad
            // console.dir('bday = '+b.day());
            pad = b.day();
            decreasePad = true;
        }

        if (pad <= 0) {
            break;
        }

        timeLine.unshift({
            key: `${b.date()}-${b.month()}-${b.year()}`,
            weekDay: b.day(),
            day: b.date(),
            month: b.month(),
            year: b.year(),
            selected:
                !decreasePad && isChosenMonthYear && b.date() === chosenDay,
            currentMonth: b.year() === chosenYear && b.month() === chosenMonth,
        });

        if (decreasePad) {
            pad -= 1;
        }
        i += 1; // emergency exit
    }

    i = 0;
    pad = 1;
    decreasePad = false;
    while (i < 50) {
        timeLine.push({
            key: `${f.date()}-${f.month()}-${f.year()}`,
            weekDay: f.day(),
            day: f.date(),
            month: f.month(),
            year: f.year(),
            selected:
                !decreasePad && isChosenMonthYear && f.date() === chosenDay,
            currentMonth: f.year() === chosenYear && f.month() === chosenMonth,
        });

        f = f.add(1, 'day');
        if (cMonth !== f.month() && !decreasePad) {
            // went out of the chosen month borders, now need to pad
            // we pad to 6 full weeks to display: 6 weeks * 7 days = 42 days to display
            pad = 42 - timeLine.length;
            decreasePad = true;
        }

        if (pad <= 0) {
            break;
        }

        if (decreasePad) {
            pad -= 1;
        }
        i += 1; // emergency exit
    }

    // now group by weeks
    const byWeeks: TimeLineItemType[][] = [];
    let cWeek: TimeLineItemType[] = [];
    timeLine.forEach((day) => {
        if (day.weekDay === 1 && cWeek.length) {
            // week starts with monday, monday has number 1
            byWeeks.push(cWeek);
            cWeek = [];
        }

        cWeek.push(day);
    });
    // push the last if not empty
    if (cWeek.length) {
        byWeeks.push(cWeek);
    }

    return {
        cMonth,
        grid: byWeeks,
    };
};
