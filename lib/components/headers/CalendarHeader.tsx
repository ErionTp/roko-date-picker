import { StyleSheet, View, Text } from 'react-native';
import React, { FC, useMemo } from 'react';
import IconButton from '../buttons/IconButton';
import { startOfWeek, addDays } from 'date-fns';

interface Props {
  title: string;
  handleOnPrevClick: () => void;
  handleOnNextClick: () => void;
}
const CalendarHeader: FC<Props> = ({ title, handleOnPrevClick, handleOnNextClick }) => {
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
      <IconButton icon={'chevron-left'} onPress={handleOnPrevClick} />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ textTransform: 'capitalize' }}>{title}</Text>
      </View>
      <IconButton icon={'chevron-right'} onPress={handleOnNextClick} />
    </View>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    flex: 1,
  },
});
