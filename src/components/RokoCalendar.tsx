import { StyleSheet, View } from 'react-native';
import React, { FC, useCallback, useMemo, useState } from 'react';
import MainContext from '../features/hooks/MainContext';
import { ISingleProps } from '../models/ISingleProps';
import { IMultiProps } from '../models/IMultiProps';
import CalendarHeader from './headers/CalendarHeader';
import WeekLabels from './headers/WeekLabels';
import { defaultTheme, prepareMonthList } from '../utils/Common';
import { Theme } from '../models/Theme';
import Weeks from './Weeks';
import Months from './Months';
import CalendarYearHeader from './headers/YearHeader';
import CalendarYearView from './Years';
import { format } from 'date-fns';
import { CalendarType } from '../utils/Enums';

type SelectionProps = ISingleProps | IMultiProps;

interface BaseProps {
  theme?: Partial<Theme>;
  blockedDates?: Date[];
}

type RokoCalendarProps = BaseProps & SelectionProps;

const RokoCalendar: FC<RokoCalendarProps> = ({ theme = defaultTheme, value, onChange, multiple, blockedDates }) => {
  // #region Members
  const date = multiple ? (value.endDate ? [value.startDate, value.endDate] : [value.startDate]) : [value];
  const contextData = useMemo(() => {
    return { value: date, onChange, multiple, theme, blockedDates };
  }, [date, onChange, multiple, theme, blockedDates]);
  // #endregion
  // #region States
  const [currentView, setCurrentView] = useState<string>(CalendarType.Calendar);
  const [currentDate, setCurrentDate] = useState<Date>(contextData.value[0]);
  const [currentYear, setCurrentYear] = useState<number>(Number(format(currentDate, 'yyyy')));
  const [startYear, setStartYear] = useState<number>(currentYear - 10);
  const [endYear, setEndYear] = useState<number>(currentYear + 1);
  // #endregion
  // #region Functions
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

  const renderMonthView = () => (
    <>
      <CalendarHeader
        bodyType={() => {
          if (currentView === CalendarType.Month) {
            setCurrentView('Year');
          }
        }}
        {...{ currentDate, onPreviousMonthClick: handleOnPreviousMonth, onNextMonthClick: handleOnNextMonth }}
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
  );

  const renderYearView = () => (
    <>
      <CalendarYearHeader
        bodyType={() => setCurrentView(CalendarType.Calendar)}
        {...{ currentDate, currentYear, onPreviousYearClick: handleOnPreviousYear, onNextYearClick: handleOnNextYear }}
      />
      <CalendarYearView
        currentYear={currentYear}
        bodyType={() => setCurrentView(CalendarType.Calendar)}
        yearsInRange={yearsInRange}
        onSelectYear={(val) => {
          setCurrentYear(val);
        }}
      />
    </>
  );

  const renderCalendarView = () => (
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
  );

  return (
    <MainContext.Provider value={contextData}>
      <View style={styles.root}>
        {(() => {
          switch (currentView) {
            case CalendarType.Month:
              return renderMonthView();
            case CalendarType.Year:
              return renderYearView();
            case CalendarType.Calendar:
              return renderCalendarView();
            default:
              return null;
          }
        })()}
      </View>
    </MainContext.Provider>
  );
};

export default RokoCalendar;

const styles = StyleSheet.create({ root: { flex: 1 } });
