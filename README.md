# roko-date-picker

1. Install

```
npm i roko-date-picker
```

2. Usage

```
import { StyleSheet, Switch, View } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "./Header";
import { materialColors, RokoCalendar, Theme, Range } from "../../../src/";
import { previousDay } from "date-fns";

const calendarStyle: Theme = {
  colors: {
    primary: "#FF5733",
    onPrimary: "white",
    secondary: "#FFF9C4",
    onSecondary: "#9E9E9E",
    background: "#DAF7A6",
    onBackground: "#000000",
  },
  font: {},
};

const DatePicker = () => {
  // #region States
  const [mode, toggleMode] = useState<"single" | "range">("range");
  const [range, setRange] = useState<Range>([new Date()]);
  // #endregion
  // #region Functions
  const handleToggleMode = useCallback(() => {
    switch (mode) {
      case "range":
        toggleMode("single");
        break;
      default:
        toggleMode("range");
        break;
    }
  }, [mode]);
  // #endregion
  return (
    <View style={styles.root}>
      <Header {...{ title: "Single Picker", range, onPress: () => {}, mode }} />
      <View style={{ height: 360, backgroundColor: materialColors.grey._200, borderRadius: 16, overflow: "hidden", padding: 8 }}>
        <RokoCalendar {...{ mode, range, setRange, blockedDates: [previousDay(new Date(), 4)], blockPast: true, theme: calendarStyle }} />
      </View>
      <Switch value={mode === "range"} onChange={() => handleToggleMode()} />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({ root: { gap: 16, flex: 1 } });
```
