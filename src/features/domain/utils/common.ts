import isSameDay from "date-fns/isSameDay";
import { tRange } from "../types/t.range";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";

export const selectedDay = (range: tRange, day: Date) =>
  range.some((i) => {
    if (!i) return false;
    return isSameDay(i, day);
  });

export const isBetweenDates = (targetDate: Date, startDate: Date, endDate: Date) => {
  return (isAfter(targetDate, startDate) || isSameDay(targetDate, startDate)) && (isBefore(targetDate, endDate) || isSameDay(targetDate, endDate));
};
