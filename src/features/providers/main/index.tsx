import React, { FC, createContext, useMemo, useState } from 'react';
import { ReactNode } from 'react';
import { tMain } from '../../domain/types/t.Main';
import { eType } from '../../domain/enums/e.Type';
import { tApplication } from '../../domain/types/t.Application';
import theme from '../../domain/data/default.theme';

export const MainContext = createContext<tMain>({
  range: [new Date()],
  mode: 'single',
  calendarType: eType.MONTH,
  setCalendarType: () => Function,
  onChange: () => Function,
  currentDate: new Date(),
  setCurrentDate: () => Function,
  theme: theme,
  cellSize: undefined,
  setCellSize: () => Function,
});

export type MainProviderProps = tApplication & {
  children: ReactNode;
};

export const MainProvider: FC<MainProviderProps> = ({ children, range, mode = 'single', onChange, theme }) => {
  // #region States
  const [cellSize, setCellSize] = useState<number | undefined>(undefined);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [calendarType, setCalendarType] = useState<eType>(eType.MONTH);
  // #endregion
  // #region Effects
  // #endregion
  // #region Functions
  // #endregion
  // #region Varaiables
  const memoValue = useMemo(
    () => ({ range, mode, calendarType, setCalendarType, onChange, currentDate, setCurrentDate, theme, cellSize, setCellSize }),
    [range, mode, calendarType, currentDate, theme, cellSize]
  );
  // #endregion
  return <MainContext.Provider value={memoValue}>{children}</MainContext.Provider>;
};
