import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { format } from 'date-fns';
import IconButton from '../buttons/IconButton';
import { useMainContext } from '../../hooks/MainContext';

interface Props {
  currentDate: Date;
  onPreviousMonthClick: () => void;
  onNextMonthClick: () => void;
}
const CalendarHeader: FC<Props> = ({ currentDate, onPreviousMonthClick, onNextMonthClick }) => {
  const { theme } = useMainContext();

  return (
    <View style={styles.root}>
      <IconButton icon={'chevron-left'} onPress={onPreviousMonthClick} />
      <TouchableOpacity activeOpacity={1} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, color: theme?.onBackground }}>{format(currentDate, 'MMMM, yyyy')}</Text>
      </TouchableOpacity>
      <IconButton icon={'chevron-right'} onPress={onNextMonthClick} />
    </View>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({ root: { flex: 1, flexDirection: 'row' } });
