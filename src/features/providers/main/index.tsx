import React, { FC, createContext, useCallback, useMemo, useState } from "react";
import { ReactNode } from "react";
import { tMain } from "../../domain/types/t.main";
import { tApp } from "../../domain/types/t.app";
import { eCalendarPicker } from "../../domain/enums/e.calendar.picker";
import { defaultLayoutRectangle, defaultRange, defaultTheme } from "../../domain/data/data.defaults";
import { tRange } from "../../domain/types/t.range";
import { isAfter, isSameDay } from "date-fns";
import { LayoutRectangle } from "react-native";

export const Context = createContext<tMain>({
  mode: "single",
  range: defaultRange,
  setRange: () => Function,
  onChange: () => Function,
  pickerType: eCalendarPicker.currentMonth,
  setPickerType: () => Function,
  currentDate: new Date(),
  setCurrentDate: () => Function,
  containerMeasures: defaultLayoutRectangle,
  setContainerMeasures: () => Function,
  theme: defaultTheme,
});

export type Props = tApp & {
  children: ReactNode;
};

export const MainProvider: FC<Props> = ({ children, mode = "single", range, setRange, theme = defaultTheme }) => {
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
  // #endregion
  // #region Variables
  const memoValue = useMemo(
    () => ({
      mode,
      range,
      setRange,
      onChange,
      pickerType,
      setPickerType,
      currentDate,
      setCurrentDate,
      containerMeasures,
      setContainerMeasures,
      theme: theme ?? defaultTheme,
    }),
    [mode, range, onChange, pickerType, currentDate, containerMeasures, setRange, theme]
  );
  // #endregion

  return <Context.Provider value={memoValue}>{children}</Context.Provider>;
};
