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
  const [currentDate, setCurrentDate] = useState<Date>(contextData.value[0]);
  // #endregion
  // #region FUNCTIONS
  const currentDateList = useMemo(() => {
    // setCurrentDate(contextData.value);
    return prepareMonthList(currentDate);
  }, [currentDate.getMonth(), currentDate.getFullYear()]);

  const handleOnPreviousMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  }, [currentDate.getMonth(), currentDate.getFullYear()]);

  const handleOnNextMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  }, [currentDate.getMonth(), currentDate.getFullYear()]);

  // #endregion
  return (
    <MainContext.Provider value={contextData}>
      <View style={styles.root}>
        <CalendarHeader {...{ currentDate, onPreviousMonthClick: handleOnPreviousMonth, onNextMonthClick: handleOnNextMonth }} />
        <WeekLabels />
        {currentDateList.map((week, index) => (
          <Weeks key={index} {...{ week, currentDate }} />
        ))}
      </View>
    </MainContext.Provider>
  );
};

export default RokoCalendar;

const styles = StyleSheet.create({ root: { flex: 1, gap: 2 } });
