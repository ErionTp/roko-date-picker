import { addDays, eachDayOfInterval, eachWeekOfInterval, endOfMonth, startOfMonth } from 'date-fns';

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

export const prepareMonthsOfYear = (date: Date): Date[] => {
  const year = date.getFullYear();
  const months = [];

  for (let month = 0; month < 12; month++) {
    const monthDate = new Date(year, month);
    months.push(monthDate);
  }

  return months;
};

export const prepareYearsBasedOnDate = (date: Date): Date[] => {
  const currentYear = date.getFullYear();
  const years = [];

  for (let year = currentYear - 11; year <= currentYear; year++) {
    const yearDate = new Date(year, 0); // Using 0 for the month to get January of each year
    years.push(yearDate);
  }

  return years;
};

export const isDateArray = (array: any[]): boolean => array.every((item) => item instanceof Date);
