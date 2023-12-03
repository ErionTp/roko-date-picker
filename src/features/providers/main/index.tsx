import React, { FC, createContext, useCallback, useMemo, useState } from "react";
import { ReactNode } from "react";
import { tApp } from "../../domain/types/t.app";
import { eCalendarPicker } from "../../domain/enums/e.calendar.picker";
import { defaultLayoutRectangle, defaultRange, defaultTheme } from "../../domain/data/data.defaults";
import { tRange } from "../../domain/types/t.range";
import { isAfter, isSameDay } from "date-fns";
import { LayoutRectangle } from "react-native";
import { tMain } from "../../domain/types/t.main";

export const Context = createContext<tMain>({
  mode: "single",
  range: defaultRange,
  setRange: () => Function,
  theme: defaultTheme,
  blockedDates: [],
  blockPast: false,
  onChange: () => Function,
  pickerType: eCalendarPicker.currentMonth,
  setPickerType: () => Function,
  currentDate: new Date(),
  onSetCurrentDate: () => Function,
  containerMeasures: defaultLayoutRectangle,
  setContainerMeasures: () => Function,
  adjustDate: () => Function,
});

export type Props = tApp & {
  children: ReactNode;
};

export const MainProvider: FC<Props> = ({ children, mode = "single", range, setRange, theme = defaultTheme, blockedDates = [], blockPast }) => {
  // #region States
  const [containerMeasures, setContainerMeasures] = useState<LayoutRectangle>(defaultLayoutRectangle);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pickerType, setPickerType] = useState(eCalendarPicker.currentMonth);
  // #endregion
  // #region Call Backs
  const onChange = useCallback(
    (args: Date) => {
      setRange((prevRange) => {
        switch (mode) {
          case "single":
            return [args];
          default:
            if (prevRange.length === 1) {
              const newRange: tRange = isAfter(args, prevRange[0]) || isSameDay(args, prevRange[0]) ? [...prevRange, args] : [args];
              return newRange;
            } else {
              return [args];
            }
        }
      });
    },
    [mode, setRange]
  );
  const onSetCurrentDate = useCallback(
    (args: Date) => {
      setCurrentDate(args);
      setPickerType((prev) => prev - 1);
    },
    [mode, setCurrentDate]
  );
  const adjustDate = (isNext: boolean) => {
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
  };

  // #endregion
  // #region Variables
  const memoValue = useMemo(
    () => ({
      mode,
      range,
      setRange,
      theme: theme ?? defaultTheme,
      blockedDates,
      blockPast,
      onChange,
      pickerType,
      setPickerType,
      currentDate,
      onSetCurrentDate,
      containerMeasures,
      setContainerMeasures,
      adjustDate,
    }),
    [mode, range, setRange, theme, blockedDates, blockPast, onChange, pickerType, currentDate, onSetCurrentDate, containerMeasures]
  );
  // #endregion

  return <Context.Provider value={memoValue}>{children}</Context.Provider>;
};
