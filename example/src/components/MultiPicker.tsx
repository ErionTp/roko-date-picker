import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import RokoCalendar from '../../../src';
import Header from './Header';

const calendarStyle = {
  primary: '#FF5733',
  onPrimary: 'white',
  primaryVariant: '#FFF9C4',
  onPrimaryVariant: '#9E9E9E',
  background: '#DAF7A6',
  onBackground: '#000000',
};

const MultiPicker = () => {
  // #region MEMBERS
  const animatedValue = useSharedValue(0);
  // #endregion
  // #region STATES
  const [range, setRange] = useState<{ startDate: Date; endDate?: Date }>({ startDate: new Date(), endDate: new Date() });
  const [isOpen, toggleShow] = useState(false);
  // #endregion
  // #region FUNCTIONS
  const animate = (value: number) => {
    animatedValue.value = withTiming(value, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(toggleShow)(value !== 0);
      }
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, [0, 50 * 7], [0, 1]);
    const padding = interpolate(animatedValue.value, [0, 50 * 7], [0, 16]);
    const borderRadius = interpolate(animatedValue.value, [0, 50 * 7], [0, 16]);
    const display = animatedValue.value < 5 ? 'none' : 'flex';
    return { height: animatedValue.value, opacity, padding, borderRadius, display };
  });

  // #endregion
  return (
    <View style={{}}>
      <Header {...{ title: 'Multi Picker', startDate: range.startDate, endDate: range.endDate, onPress: () => animate(isOpen ? 0 : 50 * 7) }} />
      <Animated.View style={[animatedStyle]}>
        <RokoCalendar multiple value={range} onChange={setRange} />
      </Animated.View>
    </View>
  );
};

export default MultiPicker;

const styles = StyleSheet.create({ root: {} });
