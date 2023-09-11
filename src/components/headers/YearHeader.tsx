import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import IconButton from '../buttons/IconButton';
import { useMainContext } from '../../hooks/MainContext';
import Layout from '../../utils/Layout';
import { format } from 'date-fns';
interface Props {
  currentYear: number | null;
  currentDate: Date;
  onPreviousYearClick: () => void;
  onNextYearClick: () => void;
  bodyType: (val: string) => void;
}
const CalendarYearHeader: FC<Props> = ({ currentYear, currentDate, bodyType, onPreviousYearClick, onNextYearClick }) => {
  const { theme } = useMainContext();

  return (
    <View style={styles.root}>
      <IconButton icon={'chevron-left'} onPress={onPreviousYearClick} />
      <TouchableOpacity
        onPress={() => {
          bodyType('');
        }}
        activeOpacity={1}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ fontSize: 16, color: theme?.onBackground }}>
          {currentYear ? `${format(currentDate, 'MMMM')}  ${currentYear}` : new Date().getFullYear()}
        </Text>
      </TouchableOpacity>
      <IconButton icon={'chevron-right'} onPress={onNextYearClick} />
    </View>
  );
};

export default CalendarYearHeader;

const styles = StyleSheet.create({ root: { height: Layout.headerHeight, flexDirection: 'row' } });
