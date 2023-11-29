import { StyleSheet, View } from 'react-native';
import React, { FC, memo, useCallback, useMemo } from 'react';
import Cell from './Cell';
import { useMainContext } from '../features/hooks/MainContext';
import { isAfter, isBefore, isEqual, isSameDay, isSameMonth } from 'date-fns';
import BetweenDates from './BetweenDates';

interface Props {
  week: Date[];
  currentDate: Date;
}

const TestWeek: FC<Props> = ({ week, currentDate }) => {
  // #region CUSTOM HOOKS
  const context = useMainContext();
  // #endregion
  // #region MEMBERS
  const weekData = useMemo(() => {
    return week.map((item) => {
      const foundIndex = context.value.findIndex((i) => isSameDay(i, item));
      const isSelected = foundIndex > -1;
      const isDifferentMonth = !isSameMonth(currentDate, item);
      const isBetween = isBetweenDates(item, context.value[0], context.value[1]);
      const firstSelection = isSameDay(item, context.value[0]);
      const secondSelection = isSameDay(item, context.value[1]);
      const isBlockedDay = context.blockedDates ? context.blockedDates.some((d) => isSameDay(d, item)) : false;
      return { item, isSelected, isDifferentMonth, isBetween, firstSelection, secondSelection, isBlockedDay };
    });
  }, [week, context, currentDate]);
  // #endregion
  // #region FUNCTIONS

  function isBetweenDates(targetDate: Date, startDate: Date, endDate: Date) {
    return (isAfter(targetDate, startDate) || isEqual(targetDate, startDate)) && (isBefore(targetDate, endDate) || isEqual(targetDate, endDate));
  }

  const handleSelectDate = useCallback(
    (v: Date) => {
      if (context.multiple) {
        if (context.value.length === 1 && (isAfter(v, context.value[0]) || isSameDay(v, context.value[0]))) {
          const newDates = [...context.value, v];
          context.onChange({ startDate: newDates[0], endDate: v });
        } else {
          context.onChange({ startDate: v });
        }
      } else {
        context.onChange(v);
      }
    },
    [context]
  );
  // #endregion

  return (
    <View style={styles.root}>
      {weekData.map((data, index) => (
        <View key={index} style={{ flex: 1 }}>
          <BetweenDates {...{ isBetween: data.isBetween, firstSelection: data.firstSelection, secondSelection: data.secondSelection }} />
          <Cell
            key={data.item.toDateString()}
            {...{
              item: data.item,
              isSelected: data.isSelected,
              setDate: handleSelectDate,
              isDifferentMonth: data.isDifferentMonth,
              isBlocked: data.isBlockedDay,
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default memo(TestWeek);

const styles = StyleSheet.create({ root: { flex: 1, flexDirection: 'row' } });
