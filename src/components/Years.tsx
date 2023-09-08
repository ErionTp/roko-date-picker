import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMainContext } from '../hooks/MainContext';
import { ITheme } from '../models/ITheme';

interface CalendarYearViewProps {
  currentYear: number | null;
  onSelectYear: (year: number) => void;
  yearsInRange: number[];
  bodyType: (val: string) => void;
}

const CalendarYearView: React.FC<CalendarYearViewProps> = ({ bodyType, onSelectYear, yearsInRange, currentYear }) => {
  const { theme } = useMainContext();
  const themedStyle = useMemo(() => styles(theme), []);

  return (
    <View style={themedStyle.yearGrid}>
      {yearsInRange.map((year) => (
        <TouchableOpacity
          key={year}
          style={[themedStyle.yearButton, currentYear === year && themedStyle.selectedYearButton]}
          onPress={() => {
            onSelectYear(year);
            bodyType('');
          }}
        >
          <Text>{year}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = (theme?: ITheme) =>
  StyleSheet.create({
    yearGrid: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap',
    },
    yearButton: {
      width: 100,
      borderRadius: 5,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedYearButton: {
      backgroundColor: 'lightblue',
    },
  });

export default CalendarYearView;
