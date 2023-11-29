import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { format } from 'date-fns';
import IconButton from '../buttons/IconButton';
import { useMainContext } from '../../features/hooks/MainContext';
import Layout from '../../utils/Layout';
import { CalendarType } from '../../utils/Enums';

interface Props {
  currentDate: Date;
  onPreviousMonthClick: () => void;
  onNextMonthClick: () => void;
  bodyType: (val: string) => void;
}
const CalendarHeader: FC<Props> = ({ currentDate, onPreviousMonthClick, onNextMonthClick, bodyType }) => {
  const { theme } = useMainContext();

  return (
    <View style={styles.root}>
      <IconButton icon={'chevron-left'} onPress={onPreviousMonthClick} />
      <TouchableOpacity
        onPress={() => {
          bodyType(CalendarType.Month);
        }}
        activeOpacity={1}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ fontSize: 16, color: theme?.onBackground }}>{format(currentDate, 'MMMM, yyyy')}</Text>
      </TouchableOpacity>
      <IconButton icon={'chevron-right'} onPress={onNextMonthClick} />
    </View>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({ root: { height: Layout.headerHeight, flexDirection: 'row' } });
