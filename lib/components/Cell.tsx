import { StyleSheet, Text, View } from 'react-native';
import React, { FC, memo } from 'react';
import { format } from 'date-fns';
import TodayIndicator from './TodayIndicator';
import { useTheme } from '../hooks/ThemeContext';
import { ITheme } from '../models/props/ITheme';

interface Props {
  day: Date;
  selected: boolean;
  isCurrentMonth: boolean;
}
const Cell: FC<Props> = ({ day, selected, isCurrentMonth }) => {
  const theme = useTheme();

  const style = () => {
    return styles(theme);
  };

  return (
    <View style={style().root}>
      <Text numberOfLines={1} adjustsFontSizeToFit style={[style().text, !isCurrentMonth && style().differentMonth, selected && style().selected]}>
        {format(day, 'dd')}
      </Text>
      <TodayIndicator {...{ value: day, selected }} />
    </View>
  );
};

export default memo(Cell);

const styles = (theme: ITheme) =>
  StyleSheet.create({
    root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    text: { fontSize: 14, color: theme.onBackground },
    selected: { color: theme.onPrimary },
    differentMonth: { color: theme.secondary },
  });
