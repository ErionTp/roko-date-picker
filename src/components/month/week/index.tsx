import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native';
import React, { FC, memo, useCallback, useMemo } from 'react';
import DayView from './day';
import useMain from '../../../features/hooks/useMain';
import { tRange } from '../../../features/domain/types/t.Range';
import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from 'date-fns/isSameDay';
import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';
import isBefore from 'date-fns/isBefore';
import { WeekData } from '../../../features/domain/types/t.WeekData';
import BetweenDates from './between-indicator';
type Props = ViewProps & {
  week: Date[];
};
const WeekView: FC<Props> = ({ week, ...rest }) => {
  // #region Members
  const { range, onChange, mode, currentDate, setCellSize } = useMain();
  // #endregion
  // #region Callbacks
  const handleSelectDate = useCallback(
    (args: Date) => {
      if (!onChange) return;

      switch (mode) {
        case 'single':
          onChange([args]);
          break;

        default:
          if (range.length === 1) {
            const newRange: tRange = isAfter(args, range[0]) || isSameDay(args, range[0]) ? [...range, args] : [args];
            onChange(newRange);
          } else {
            onChange([args]);
          }
      }
    },
    [mode, onChange, range]
  );

  // #endregion
  // #region Functions
  const handleMeasureWeek = (e: LayoutChangeEvent) => setCellSize(e.nativeEvent.layout.width / 7);

  function isBetweenDates(targetDate: Date, startDate: Date, endDate: Date) {
    return (isAfter(targetDate, startDate) || isEqual(targetDate, startDate)) && (isBefore(targetDate, endDate) || isEqual(targetDate, endDate));
  }
  // #endregion
  // #region Variables
  const weekData = useMemo(() => {
    return week.map((day) => {
      const selected = range.some((i) => isSameDay(i, day));
      const sameMonth = isSameMonth(day, currentDate);

      const isBetween = mode === 'range' ? isBetweenDates(day, range[0], range[1] ?? range[0]) : false;
      const firstSelection = mode === 'range' ? isSameDay(day, range[0]) : false;
      const secondSelection = mode === 'range' ? isSameDay(day, range[1] ?? range[0]) : false;

      const args: WeekData = {
        day,
        selected,
        sameMonth,
        isBetween,
        firstSelection,
        secondSelection,
      };
      return args;
    });
  }, [week, range[0], range[1]]);
  // #endregion
  // #region Views
  const renderItem = (item: WeekData, index: number) => {
    return (
      <View key={index} style={{ flex: 1, justifyContent: 'center' }}>
        {mode === 'range' && (
          <BetweenDates {...{ isBetween: item.isBetween, firstSelection: item.firstSelection, secondSelection: item.secondSelection }} />
        )}
        <DayView {...{ item: item.day, selected: item.selected, sameMonth: item.sameMonth, setCurrentDate: handleSelectDate }} />
      </View>
    );
  };
  // #endregion
  return (
    <View onLayout={handleMeasureWeek} {...rest} style={styles.root}>
      {weekData.map(renderItem)}
    </View>
  );
};

export default memo(WeekView);

WeekView.displayName = 'WeekView';

const styles = StyleSheet.create({ root: { flex: 1, flexDirection: 'row' } });
