import { StyleSheet, View, Text } from 'react-native';
import React, { FC, useCallback, useMemo, useState } from 'react';
import CalendarHeader from './components/CalendarHeader';
import { format, isAfter, isValid } from 'date-fns';
import { prepareMonthList } from './utils/Common';
import WeekContainer from './components/WeekContainer';
import WeekIndicator from './components/WeekIndicator';
import Styles from './utils/Styles';
import Constants from './utils/Constants';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type SingleSelectProps = {
  multiple?: false;
  value: Date;
  onChange: (value: Date) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: { startDate: Date; endDate?: Date };
  onChange: (range: { startDate: Date; endDate?: Date }) => void;
};

type Props = SingleSelectProps | MultipleSelectProps;

const RokoCalendar: FC<Props> = ({ multiple, value, onChange }) => {
  const isValidDate = (date: Date): boolean => isValid(date);

  const isValidValue = multiple ? isValidDate(value.startDate) && (value.endDate ? isValidDate(value.endDate) : true) : isValidDate(value);

  if (!isValidValue) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <MaterialCommunityIcons name="alert-circle" size={24} />
          <Text style={{ fontSize: 18, marginStart: Constants.spacing.regular }}>Please provide valid dates to the calendar</Text>
        </View>
      </View>
    );
  }

  // #region MEMBERS
  const initialSelectedDates = multiple ? (value.endDate ? [value.startDate, value.endDate] : [value.startDate]) : [value];
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
  // #endregion
  return (
    <View style={styles.root}>
      <CalendarHeader title={format(currentDate, 'MMM dd, yyyy')} {...{ handlePreviousMonth, handleNextMonth }} />
      <WeekIndicator />
      <View style={styles.container}>
        {currentDateList.map((week, weekIndex) => (
          <WeekContainer key={weekIndex} {...{ week, currentDate }} value={selectedDates} onChange={handleSetCurrentDay} />
        ))}
      </View>
    </View>
  );
};

export default RokoCalendar;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: { flex: 1, borderBottomWidth: 1, borderTopWidth: 1, borderColor: Styles.primaryVariant },
});
