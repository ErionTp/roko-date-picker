import { StyleSheet, View } from 'react-native';
import React, { FC, useCallback, useMemo, useState } from 'react';
import MainContext from '../hooks/MainContext';
import { ISingleProps } from '../models/ISingleProps';
import { IMultiProps } from '../models/IMultiProps';
import CalendarHeader from './headers/CalendarHeader';
import WeekLabels from './headers/WeekLabels';
import { prepareMonthList } from '../utils/Common';
import { ITheme } from '../models/ITheme';
import MaterialColors from '../utils/MaterialColors';
import Weeks from './Weeks';
import Months from './months/Months';
import CalendarMonthHeader from './headers/MonthHeader';
import CalendarYearHeader from './headers/YearHeader';
import CalendarYearView from './Years';
import { format } from 'date-fns';

type SelectionProps = ISingleProps | IMultiProps;

interface BaseProps {
  theme?: any;
}

type RokoCalendarProps = BaseProps & SelectionProps;

const defaultTheme: ITheme = {
  primary: MaterialColors.blue_grey_400,
  onPrimary: MaterialColors.white,
  secondary: MaterialColors.blue_grey_100,
  onSecondary: MaterialColors.blue_grey_300,
  background: MaterialColors.grey_50,
  onBackground: MaterialColors.grey_900,
};

const RokoCalendar: FC<RokoCalendarProps> = ({ theme = defaultTheme, value, onChange, multiple }) => {
  // #region MEMBERS
  const date = multiple ? (value.endDate ? [value.startDate, value.endDate] : [value.startDate]) : [value];
  const contextData = useMemo(() => {
    return { value: date, onChange, multiple, theme };
  }, [date, onChange, multiple, theme]);
  // #endregion
  // #region STATES
  const [currentView, setCurrentView] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(contextData.value[0]);
  const [currentYear, setCurrentYear] = useState<number>(Number(format(currentDate, 'yyyy')));
  const [startYear, setStartYear] = useState<number>(currentYear - 10);
  const [endYear, setEndYear] = useState<number>(currentYear + 1);

  // #endregion
  // #region FUNCTIONS
  const arrayRange = (start: number, stop: number, step: number) => {
    const yearsToShow = 12;
    const currentYear = new Date().getFullYear();
    if (currentYear >= start && currentYear <= stop) {
      const halfRange = Math.floor(yearsToShow / 2);
      const lowerRange = currentYear - halfRange * step;
      const upperRange = currentYear + (yearsToShow - halfRange - 1) * step;

      if (upperRange > stop) {
        return Array.from({ length: yearsToShow }, (_, index) => start + index * step);
      }
      return Array.from({ length: yearsToShow }, (_, index) => lowerRange + index * step);
    } else {
      return Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step);
    }
  };
  const yearsInRange = arrayRange(startYear, endYear, 1);
  let firstLoadedMonth = Number(format(currentDate, 'MM'));

  const currentDateList = useMemo(() => {
    if (currentYear || firstLoadedMonth) {
      const dateString = `${currentYear}-${firstLoadedMonth}-01`;
      const dateObject = new Date(dateString);
      setCurrentDate(dateObject);
    }
    return prepareMonthList(currentDate);
  }, [currentDate.getMonth(), currentDate.getFullYear(), currentYear]);

  const handleOnPreviousMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  }, [currentDate.getMonth(), currentDate.getFullYear(), currentYear]);

  const handleOnNextMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  }, [currentDate.getMonth(), currentDate.getFullYear()]);

  const handleOnPreviousYear = () => {
    const newStartYear = startYear - 12;
    const newEndYear = startYear - 1;
    setStartYear(newStartYear);
    setEndYear(newEndYear);
  };

  const handleOnNextYear = () => {
    const newStartYear = endYear + 1;
    const newEndYear = endYear + 12;
    setStartYear(newStartYear);
    setEndYear(newEndYear);
  };
  // #endregion
  return (
    <MainContext.Provider value={contextData}>
      <View style={styles.root}>
        {currentView === 'month' ? (
          <>
            <CalendarMonthHeader
              month={format(currentDate, 'MMMM')}
              bodyType={(val) => setCurrentView(val)}
              {...{ onPreviousMonthClick: handleOnPreviousMonth, onNextMonthClick: handleOnNextMonth }}
            />
            <Months
              currentMonth={format(currentDate, 'MMMM')}
              bodyType={(val) => setCurrentView(val)}
              setSelectedMonth={(val) => {
                const dateObject = new Date(`${currentYear}-${val.id}-01`);
                setCurrentDate(dateObject);
              }}
            />
          </>
        ) : currentView === 'year' ? (
          <>
            <CalendarYearHeader
              bodyType={() => setCurrentView(null)}
              {...{ currentYear, onPreviousYearClick: handleOnPreviousYear, onNextYearClick: handleOnNextYear }}
            />
            <CalendarYearView
              currentYear={currentYear}
              bodyType={() => setCurrentView(null)}
              yearsInRange={yearsInRange}
              onSelectYear={(val) => {
                setCurrentYear(val);
              }}
            />
          </>
        ) : (
          <>
            <CalendarHeader
              bodyType={(val) => setCurrentView(val)}
              {...{ currentDate, onPreviousMonthClick: handleOnPreviousMonth, onNextMonthClick: handleOnNextMonth }}
            />
            <WeekLabels />
            {currentDateList.map((week, index) => (
              <Weeks key={index} {...{ week, currentDate }} />
            ))}
          </>
        )}
      </View>
    </MainContext.Provider>
  );
};

export default RokoCalendar;

const styles = StyleSheet.create({ root: { flex: 1, gap: 2 } });
