import { StyleSheet, Text, View } from 'react-native';
import React, { FC, memo } from 'react';
import { format } from 'date-fns';
import Styles from '../utils/Styles';
import TodayIndicator from './TodayIndicator';

interface Props {
  day: Date;
  selected: boolean;
  isCurrentMonth: boolean;
}
const Cell: FC<Props> = ({ day, selected, isCurrentMonth }) => {
  return (
    <View style={styles.root}>
      <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.text, !isCurrentMonth && styles.differentMonth, selected && styles.selected]}>
        {format(day, 'dd')}
      </Text>
      <TodayIndicator {...{ value: day, selected }} />
    </View>
  );
};

export default memo(Cell);

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 14, color: Styles.onBackground },
  selected: { color: Styles.onPrimary },
  differentMonth: { color: Styles.secondary },
});
