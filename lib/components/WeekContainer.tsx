import { StyleSheet, View } from 'react-native';
import React, { FC, memo } from 'react';
import Day from './Day';
import { isAfter, isBefore, isEqual, isSameDay, isSameMonth } from 'date-fns';
import BetweenDates from './BetweenDates';
import { IWeekContainer } from '../models/props/IWeekContainer';
import { useTheme } from '../hooks/ThemeContext';

const WeekContainer: FC<IWeekContainer> = ({ week, value, currentDate, onChange }) => {
  // #region HOOKS
  const context = useTheme();
  // #endregion
  // #region FUNCTIONS
  function isBetweenDates(targetDate: Date, startDate: Date, endDate: Date) {
    return (isAfter(targetDate, startDate) || isEqual(targetDate, startDate)) && (isBefore(targetDate, endDate) || isEqual(targetDate, endDate));
  }
  // #endregion
  return (
    <View
      style={[
        styles.root,
        { flex: context.spacing && context.spacing.weekHeight ? undefined : 1, height: context.spacing && context.spacing.weekHeight },
      ]}
    >
      {week.map((day, dayIndex) => {
        const foundIndex = value.findIndex((i) => isSameDay(i, day));
        const selected = foundIndex > -1;
        const isCurrentMonth = isSameMonth(day, currentDate);
        const isBetween = isBetweenDates(day, value[0], value[1]);
        const firstSelection = isSameDay(day, value[0]);
        const secondSelection = isSameDay(day, value[1]);
        return (
          <View key={dayIndex} style={{ flex: 1 }}>
            <BetweenDates {...{ isBetween, firstSelection, secondSelection }} />
            <Day key={dayIndex} {...{ day, selected, isCurrentMonth, onChange }} />
          </View>
        );
      })}
    </View>
  );
};

export default memo(WeekContainer);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
});
