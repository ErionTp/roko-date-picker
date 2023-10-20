# roko-date-picker

1. Install

```
npm i roko-date-picker
```

2. Usage

```
import { StyleSheet, Switch, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import Animated, { Easing, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
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
  // #region Members
  const animatedValue = useSharedValue(50 * 7);
  // #endregion
  // #region States
  const [isOpen, toggleShow] = useState(true);
  const [isMultiple, toggleMultiple] = useState(true);
  const [range, setRange] = useState<any>({ startDate: new Date(), endDate: new Date() });
  // #endregion
  // #region Functions
  const animate = (value: number) => {
    animatedValue.value = withTiming(value, { duration: 250, easing: Easing.circle }, (finished) => {
      if (finished) {
        runOnJS(toggleShow)(value !== 0);
      }
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, [0, 50 * 7], [0, 1]);
    const padding = interpolate(animatedValue.value, [0, 50 * 7], [0, 16]);
    const display = animatedValue.value < 5 ? 'none' : 'flex';
    return { height: animatedValue.value, opacity, padding, display };
  });

  const handleChangeDate = useCallback((v: any) => {
    isMultiple ? setRange(v) : setRange(v);
  }, []);

  // #endregion
  return (
    <View style={styles.root}>
      <Header {...{ title: 'Single Picker', value: range, onPress: () => animate(isOpen ? 0 : 50 * 7) }} />
      <Animated.View style={[animatedStyle, { height: 380, backgroundColor: MaterialColors.grey_200, borderRadius: 16 }]}>
        <RokoCalendar value={range} onChange={handleChangeDate} multiple={isMultiple} theme={calendarStyle} blockedDates={[new Date()]} />
      </Animated.View>
      <Switch value={isMultiple} onChange={() => toggleMultiple((v) => !v)} />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({ root: { gap: 16, flex: 1 } });

```
