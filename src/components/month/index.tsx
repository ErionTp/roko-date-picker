import { StyleSheet, View } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import useMain from '../../features/hooks/useMain';
import WeekView from './week';
import WeekLabels from '../headers/WeekLabels';
import { isDateArray, prepareMonthList } from '../../features/domain/utils/common';
type Props = {};
const MonthView: FC<Props> = ({}) => {
  // #region Members
  const { currentDate } = useMain();
  const dateList = useMemo(() => prepareMonthList(currentDate), [currentDate]);
  // #endregion
  // #region Functions
  const renderItem = (week: Date[], index: number) => <WeekView key={index} {...{ week }} />;
  // #endregion
  // #region Actions
  // #endregion
  return (
    <View style={styles.root}>
      <WeekLabels />
      {(dateList as Date[][]).map(renderItem)}
    </View>
  );
};

export default memo(MonthView);

MonthView.displayName = 'MonthView';

const styles = StyleSheet.create({ root: { flex: 1 } });
