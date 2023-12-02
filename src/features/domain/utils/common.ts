import isSameDay from "date-fns/isSameDay";
import { tRange } from "../types/t.range";
import isAfter from "date-fns/isAfter";
import isEqual from "date-fns/isEqual";
import isBefore from "date-fns/isBefore";

export const selectedDay = (range: tRange, day: Date) =>
  range.some((i) => {
    if (!i) return false;
    return isSameDay(i, day);
  });

export const isBetweenDates = (targetDate: Date, startDate: Date, endDate: Date) => {
  return (isAfter(targetDate, startDate) || isEqual(targetDate, startDate)) && (isBefore(targetDate, endDate) || isEqual(targetDate, endDate));
};
