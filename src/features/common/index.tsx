import addDays from "date-fns/addDays";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import endOfMonth from "date-fns/endOfMonth";
import startOfMonth from "date-fns/startOfMonth";

export const getWeeksOfCurrentMonth = (date: Date) => {
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

export const getMonthsOfCurrentYear = (date: Date): Date[] => {
  const year = date.getFullYear();
  const months = [];

  for (let month = 0; month < 12; month++) {
    const monthDate = new Date(year, month);
    months.push(monthDate);
  }

  return months;
};
