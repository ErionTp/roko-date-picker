import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';

interface Props {}
const WeekLabels: FC<Props> = ({}) => {
  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i));
    }

    return days;
  }, []);
  return (
    <View style={styles.root}>
      {weekDays.map((item, index) => (
        <View style={styles.container} key={index}>
          <Text style={{ fontSize: 12 }}>{format(item, 'EEE')}</Text>
        </View>
      ))}
    </View>
  );
};

export default WeekLabels;

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, flex: 1 },
  container: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});
