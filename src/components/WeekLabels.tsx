import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import { tTheme } from '../features/domain/types/t.Theme';
import defaultTheme from '../features/domain/data/default.theme';
import useMain from '../features/hooks/useMain';
import Constants from '../utils/Constants';

const WeekLabels = () => {
  // #region Members
  const { theme } = useMain();
  // #endregion
  // #region Variables
  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i));
    }

    return days;
  }, []);

  const customStyles = useMemo(() => {
    const currentTheme: Partial<tTheme> = theme ?? defaultTheme;
    return styles(currentTheme);
  }, [theme]);
  // #endregion
  return (
    <View style={customStyles.root}>
      {weekDays.map((item, index) => (
        <View style={customStyles.container} key={index}>
          <Text style={customStyles.title}>{format(item, 'EEE')}</Text>
        </View>
      ))}
    </View>
  );
};

export default WeekLabels;

const styles = (theme: Partial<tTheme>) =>
  StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      paddingVertical: Constants.spacing.regular,
      borderBottomColor: theme.onBackground,
    },
    container: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    title: { fontSize: 12, textTransform: 'capitalize', color: theme.onBackground },
  });
