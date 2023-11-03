import {
  addDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
} from 'date-fns';
import { Month } from '../models/Month';
import { Theme } from '../models/Theme';
import MaterialColors from './MaterialColors';

export const prepareMonthList = (date: Date) => {
  return eachWeekOfInterval(
    {
      start: startOfMonth(date),
      end: endOfMonth(date),
    },
    {
      weekStartsOn: 1,
    }
  ).reduce((acc: Date[][], cur) => {
    const allDays = eachDayOfInterval({
      start: cur,
      end: addDays(cur, 6),
    });

    acc.push(allDays);
    return acc;
  }, []);
};

export const monthData: Month[] = eachMonthOfInterval({
  start: startOfYear(new Date()),
  end: endOfYear(new Date()),
}).map((date, index) => {
  return { id: index + 1, name: format(date, 'MMMM') };
});

export const defaultTheme: Theme = {
  primary: MaterialColors.blue_grey_400,
  onPrimary: MaterialColors.white,
  secondary: MaterialColors.blue_grey_100,
  onSecondary: MaterialColors.blue_grey_300,
  background: MaterialColors.grey_50,
  onBackground: MaterialColors.grey_900,
};
