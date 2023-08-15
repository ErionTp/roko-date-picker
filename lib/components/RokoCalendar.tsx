import { StyleSheet, View } from 'react-native';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { format, isAfter, isValid } from 'date-fns';
import { IMultiSelection } from '../models/props/IMultiSelection';
import { ISingleSelection } from '../models/props/ISingleSelection';
import { prepareMonthList } from '../utils/Common';
import CalendarHeader from './CalendarHeader';
import WeekContainer from './WeekContainer';
import WeekIndicator from './WeekIndicator';
import ErrorView from './ErrorView';
import { IStyle, defaultTheme } from '../models/props/IStyle';
import ThemeContext from '../hooks/ThemeContext';
import { ITheme } from '../models/ITheme';

type SelectionProps = ISingleSelection | IMultiSelection;

interface BaseProps {
  theme?: ITheme;
}

type RokoCalendarProps = BaseProps & SelectionProps;

const RokoCalendar: FC<RokoCalendarProps> = ({ multiple, value, onChange, theme = defaultTheme }) => {
  // #region MEMBERS
  const isValidValue = multiple ? isValid(value.startDate) && (value.endDate ? isValid(value.endDate) : true) : isValid(value);
  const initialSelectedDates = multiple ? (value.endDate ? [value.startDate, value.endDate] : [value.startDate]) : [value];
  // #endregion
  // #region ACTIONS
  if (!isValidValue) {
    return <ErrorView />;
  }
  // #endregion
  // #region STATES
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>(initialSelectedDates);
  // #endregion
  // #region FUNCTIONS
  const handlePreviousMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  }, [currentDate.getMonth(), currentDate.getFullYear()]);

  const handleNextMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  }, [currentDate.getMonth(), currentDate.getFullYear()]);

  const currentDateList = useMemo(() => {
    return prepareMonthList(currentDate);
  }, [currentDate.getMonth(), currentDate.getFullYear()]);

  const handleSetCurrentDay = useCallback(
    (v: Date) => {
      if (multiple) {
        if (selectedDates.length === 1 && (isAfter(v, selectedDates[0]) || v.getTime() === selectedDates[0].getTime())) {
          setSelectedDates((prevDates) => [...prevDates, v]);
          onChange({ startDate: selectedDates[0], endDate: v });
        } else {
          setSelectedDates([v]);
          onChange({ startDate: v });
        }
      } else {
        setSelectedDates([v]);
        onChange(v);
      }
    },
    [multiple, selectedDates, onChange]
  );

  const style = () => {
    return styles(theme.colors);
  };
  // #endregion
  return (
    <ThemeContext.Provider value={theme}>
      <View style={style().root}>
        <CalendarHeader title={format(currentDate, 'MMM dd, yyyy')} {...{ handlePreviousMonth, handleNextMonth }} />
        <WeekIndicator />
        <View style={style().container}>
          {currentDateList.map((week, weekIndex) => (
            <WeekContainer key={weekIndex} {...{ week, currentDate }} value={selectedDates} onChange={handleSetCurrentDay} />
          ))}
        </View>
      </View>
    </ThemeContext.Provider>
  );
};

export default RokoCalendar;

const styles = (theme: IStyle) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    container: { flex: 1, borderBottomWidth: 1, borderTopWidth: 1, borderColor: theme.primaryVariant },
  });
