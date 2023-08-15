import { StyleSheet, View } from 'react-native';
import React, { FC, memo, useCallback } from 'react';
import { IWeekProps } from '../models/props/IWeekProps';
import DayCell from './DayCell';
import { isAfter, isEqual, isBefore, isSameDay, isSameMonth } from 'date-fns';
import BetweenDates from './BetweenDates';

const WeekContainer: FC<IWeekProps> = ({ currentDate, onChange, value, week }) => {
  // #region FUNCTIONS
  function isBetweenDates(targetDate: Date, startDate: Date, endDate: Date) {
    return (isAfter(targetDate, startDate) || isEqual(targetDate, startDate)) && (isBefore(targetDate, endDate) || isEqual(targetDate, endDate));
  }

  const handleOnChange = useCallback(
    (v: Date) => {
      onChange(v);
    },
    [onChange]
  );
  // #endregion

  return (
    <View style={styles.root}>
      {week.map((item, index) => {
        const foundIndex = value.findIndex((i) => isSameDay(i, item));
        const selected = foundIndex > -1;
        const isCurrentMonth = isSameMonth(item, currentDate);
        const isBetween = isBetweenDates(item, value[0], value[1]);
        const firstSelection = isSameDay(item, value[0]);
        const secondSelection = isSameDay(item, value[1]);
        return (
          <View key={index} style={{ flex: 1 }}>
            <BetweenDates {...{ isBetween, firstSelection, secondSelection }} />
            <DayCell {...{ item, selected, isCurrentMonth, onChange: handleOnChange }} />
          </View>
        );
      })}
    </View>
  );
};

export default memo(WeekContainer);

const styles = StyleSheet.create({ root: { flex: 1, flexDirection: 'row' } });
