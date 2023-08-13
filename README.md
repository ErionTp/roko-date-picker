# roko-date-picker

1. Install

```
npm i roko-date-picker
```

2. Usage

```
import { StyleSheet, View, Text } from 'react-native';
import RokoCalendar from 'roko-date-picker';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { format } from 'date-fns';

export default function App() {
  const [range, setRange] = useState<{ startDate: Date; endDate?: Date }>({ startDate: new Date(), endDate: new Date() });
  const [date, setDate] = useState<Date>(new Date());

  const RenderTitle = (title: string, startDate: Date, endDate?: Date) => {
    return (
      <View>
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
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            {RenderTitle('Multi Date Picker:', range.startDate, range.endDate)}
            <RokoCalendar value={range} onChange={setRange} multiple={true} />
          </View>

          <View style={{ flex: 1 }}>
            {RenderTitle('Single Date Picker:', date, undefined)}
            <RokoCalendar value={date} onChange={setDate} />
          </View>
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
    justifyContent: 'space-around',
  },
});

```
