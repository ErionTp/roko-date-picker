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
          <Text style={currentYear === year && themedStyle.selectedYearText}>{year}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = (theme?: ITheme) =>
  StyleSheet.create({
    yearGrid: {
      flexGrow: 1,
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    yearButton: {
      flexGrow: 1,
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
      height: '25%',
    },
    selectedYearButton: {
      backgroundColor: theme?.primary,
    },
    selectedYearText: {
      color: theme?.onPrimary,
    },
  });

export default CalendarYearView;
