import React, { FC, createContext, useEffect, useMemo, useState } from 'react';
import { ReactNode } from 'react';
import { tMain } from '../../domain/types/t.Main';
import { eType } from '../../domain/enums/e.Type';
import { prepareMonthList } from '../../../utils/Common';
import { tApplication } from '../../domain/types/t.Application';

export const MainContext = createContext<tMain>({
  range: [new Date()],
  mode: 'single',
  dateList: [],
  calendarType: eType.MONTH,
  setCalendarType: () => Function,
});

export type MainProviderProps = tApplication & {
  children: ReactNode;
};

export const MainProvider: FC<MainProviderProps> = ({ children, range, mode = 'single' }) => {
  // #region States
  const [calendarType, setCalendarType] = useState<eType>(eType.MONTH);
  const [dateList, setDateList] = useState<Date[][]>([]);
  // #endregion
  // #region Effects
  useEffect(() => {
    switch (calendarType) {
      case eType.DECADE:
        break;
      case eType.YEAR:
        break;
      default:
        const list = prepareMonthList(range[0]);
        setDateList(list);
        break;
    }
  }, [calendarType]);
  // #endregion
  // #endregion
  // #region Varaiables
  const memoValue = useMemo(() => ({ range, mode, dateList, calendarType, setCalendarType }), [range, mode, dateList, calendarType]);
  // #endregion
  return <MainContext.Provider value={memoValue}>{children}</MainContext.Provider>;
};
