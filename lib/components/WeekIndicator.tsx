import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import Styles from '../utils/Styles';
import Constants from '../utils/Constants';

interface Props {}
const WeekIndicator: FC<Props> = ({}) => {
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
          <Text style={styles.text}>{format(item, 'EEE')}</Text>
        </View>
      ))}
    </View>
  );
};

export default WeekIndicator;

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', paddingVertical: Constants.spacing.regular },
  container: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  text: { fontSize: 12, letterSpacing: 1.2, color: Styles.onBackground },
});
