import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';

interface Props {
  month: string;
  bodyType: (val: string) => void;
}
const CalendarMonthHeader: FC<Props> = ({ month, bodyType }) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          bodyType('year');
        }}
        activeOpacity={1}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ fontSize: 16 }}>{month}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CalendarMonthHeader;

const styles = StyleSheet.create({ root: { flexDirection: 'row' } });
