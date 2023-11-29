import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import { useMainContext } from '../../features/hooks/MainContext';
import { Theme } from '../../models/Theme';

const WeekLabels = () => {
  const { theme } = useMainContext();

  const themedStyle = useMemo(() => styles(theme), []);

  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i));
    }

    return days;
  }, []);
  return (
    <View style={themedStyle.root}>
      {weekDays.map((item, index) => (
        <View style={themedStyle.container} key={index}>
          <Text style={themedStyle.title}>{format(item, 'EEE')}</Text>
        </View>
      ))}
    </View>
  );
};

export default WeekLabels;

const styles = (theme?: Partial<Theme>) =>
  StyleSheet.create({
    root: { flexDirection: 'row', alignItems: 'center', flex: 1, borderBottomWidth: 1, borderBottomColor: theme?.secondary },
    container: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    title: { fontSize: 12, color: theme?.onBackground },
  });
