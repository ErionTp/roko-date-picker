import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RokoCalendar from './lib';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { format } from 'date-fns';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function App() {
  const [isOpen, toggleShow] = useState(false);

  const [range, setRange] = useState<{ startDate: Date; endDate?: Date }>({ startDate: new Date(), endDate: new Date() });

  const [date, setDate] = useState<Date>(new Date());

  const calendarStyle = {
    primary: '#FF5733',
    onPrimary: 'white',
    primaryVariant: '#FFF9C4',
    onPrimaryVariant: '#9E9E9E',
    background: '#DAF7A6',
    onBackground: '#000000',
  };
  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, [0, 50 * 7], [0, 1]);
    const padding = interpolate(animatedValue.value, [0, 50 * 7], [0, 16]);
    const borderRadius = interpolate(animatedValue.value, [0, 50 * 7], [0, 16]);
    const display = animatedValue.value < 5 ? 'none' : 'flex';
    return { height: animatedValue.value, opacity, padding, borderRadius, display };
  });

  const animate = (value: number) => {
    animatedValue.value = withTiming(value, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(toggleShow)(value !== 0);
      }
    });
  };

  const RenderTitle = (title: string, startDate: Date, endDate?: Date) => {
    return (
      <TouchableOpacity activeOpacity={1} style={{ gap: 6 }} onPress={() => animate(isOpen ? 0 : 50 * 7)}>
        <Text style={{ fontSize: 20 }}>{title}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Text>{format(startDate, 'MMM dd, yyyy')}</Text>
          {endDate && (
            <>
              <Text> - </Text>
              <Text>{endDate ? format(endDate, 'MMM dd, yyyy') : 'End date'}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {RenderTitle('Single Date Picker:', range.startDate, range.endDate)}
          <Animated.View style={[animatedStyle, {}]}>
            <RokoCalendar multiple={false} theme={{ colors: calendarStyle }} value={date} onChange={setDate} />
          </Animated.View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
});
