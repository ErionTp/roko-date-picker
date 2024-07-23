import React, { FC, PropsWithChildren, createContext, useCallback, useMemo, useState } from "react";
import { tApp } from "../../domain/types/t.app";
import { eCalendarPicker } from "../../domain/enums/e.calendar.picker";
import {
  defaultLayoutRectangle,
  defaultRange,
  defaultTheme,
} from "../../domain/data/data.defaults";
import { tRange } from "../../domain/types/t.range";
import { isAfter, isSameDay } from "date-fns";
import { tMain } from "../../domain/types/t.main";

export const Context = createContext<tMain>({
  mode: "single",
  range: defaultRange,
  setRange: () => Function,
  theme: defaultTheme,
  blockedDates: [],
  blockPast: false,
  blockedWeekDay: [],
  onChange: () => Function,
  pickerType: eCalendarPicker.currentMonth,
  setPickerType: () => Function,
  currentDate: new Date(),
  onSetCurrentDate: () => Function,
  layoutProps: defaultLayoutRectangle,
  onAdjustDate: () => Function,
});

export type Props = tApp & {};

export const MainProvider: FC<PropsWithChildren<Props>> = ({
  children,
  mode = "single",
  range,
  setRange,
  theme = defaultTheme,
  blockedDates = [],
  blockPast,
  blockedWeekDay = [],
  layoutProps,
}) => {
  // #region States
  const [currenRange, setCurrentrange] = useState<tRange>(range);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pickerType, setPickerType] = useState(eCalendarPicker.currentMonth);
  // #endregion
  // #region call backs

  const onChange = useCallback(
    (args: Date) => {
      setCurrentrange((prevRange) => {
        switch (mode) {
          case "single":
            setRange([args]);
            return [args];
          default:
            if (prevRange.length === 1) {
              const newRange: tRange =
                isAfter(args, prevRange[0]) || isSameDay(args, prevRange[0])
                  ? [...prevRange, args]
                  : [args];
              setRange(newRange);
              return newRange;
            } else {
              setRange([args]);
              return [args];
            }
        }
      });
    },
    [mode, setRange],
  );

  const onSetCurrentDate = useCallback(
    (args: Date) => {
      setCurrentDate(args);
      setPickerType((prev) => prev - 1);
    },
    [mode, setCurrentDate],
  );

  const onAdjustDate = useCallback(
    (isNext: boolean) => {
      setCurrentDate((prev) => {
        const currentDate = new Date(prev);
        const changeFactor = isNext ? 1 : -1;

        switch (pickerType) {
          case eCalendarPicker.currentYear:
            currentDate.setFullYear(currentDate.getFullYear() + changeFactor);
            break;
          case eCalendarPicker.currentDecade:
            currentDate.setFullYear(currentDate.getFullYear() + 12 * changeFactor);
            break;
          default:
            currentDate.setMonth(currentDate.getMonth() + changeFactor);
            break;
        }
        return currentDate;
      });
    },
    [pickerType],
  );
  // #endregion
  // #region variables
  const memoValue = useMemo(
    () => ({
      mode,
      range: currenRange,
      setRange,
      theme: theme ?? defaultTheme,
      blockedDates,
      blockPast,
      blockedWeekDay,
      onChange,
      pickerType,
      setPickerType,
      currentDate,
      onSetCurrentDate,
      layoutProps,
      onAdjustDate,
    }),
    [
      mode,
      range,
      setRange,
      theme,
      blockedDates,
      blockPast,
      blockedWeekDay,
      onChange,
      pickerType,
      onSetCurrentDate,
      layoutProps,
    ],
  );
  // #endregion

  return <Context.Provider value={memoValue}>{children}</Context.Provider>;
};
