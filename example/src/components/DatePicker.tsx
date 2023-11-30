import { StyleSheet, Switch, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import Header from './Header';
import RokoCalendar from '../../../src/index';
import MaterialColors from '../../../src/utils/MaterialColors';

const calendarStyle = {
  primary: '#FF5733',
  onPrimary: 'white',
  secondary: '#FFF9C4',
  onSecondary: '#9E9E9E',
  background: '#DAF7A6',
  onBackground: '#000000',
};

const DatePicker = () => {
  // #region States
  const [mode, toggleMode] = useState<'single' | 'range'>('single');
  const [range, onChange] = useState<[Date] | [Date, Date]>([new Date()]);
  // #endregion
  // #region Functions
  const handleChangeDate = useCallback((v: typeof range) => {
    onChange(v);
  }, []);
  const handleToggleMode = useCallback(() => {
    switch (mode) {
      case 'range':
        toggleMode('single');
        break;
      default:
        toggleMode('range');
        break;
    }
  }, [mode]);
  // #endregion
  return (
    <View style={styles.root}>
      <Header {...{ title: 'Single Picker', range, onPress: () => {}, mode }} />
      <View style={{ height: 380, backgroundColor: MaterialColors.grey_200, borderRadius: 16, padding: 16 }}>
        <RokoCalendar {...{ range, mode, onChange: handleChangeDate, theme: calendarStyle }} />
      </View>
      <Switch value={mode === 'single'} onChange={() => handleToggleMode()} />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({ root: { gap: 16, flex: 1 } });
