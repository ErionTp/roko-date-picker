import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import Constants from '../utils/Constants';
import { IStyle } from '../models/props/IStyle';
import { useTheme } from '../hooks/ThemeContext';

interface Props {}
const WeekIndicator: FC<Props> = ({}) => {
  // #region HOOKS
  const context = useTheme();
  // #endregion
  // #region FUNCTIONS
  const style = () => {
    return styles(context.colors);
  };

  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i));
    }

    return days;
  }, []);
  // #endregion

  return (
    <View style={style().root}>
      {weekDays.map((item, index) => (
        <View style={style().container} key={index}>
          <Text style={style().text}>{format(item, 'EEE')}</Text>
        </View>
      ))}
    </View>
  );
};

export default WeekIndicator;

const styles = (theme: IStyle) =>
  StyleSheet.create({
    root: { flexDirection: 'row', alignItems: 'center', paddingVertical: Constants.spacing.regular },
    container: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    text: { fontSize: 12, letterSpacing: 1.2, color: theme.onBackground },
  });
