# roko-date-picker

1. Install

```
npm i roko-date-picker
```

2. Usage

```
import { StyleSheet, Switch, View } from "react-native";
import React, { useCallback, useState } from "react";
import { materialColors, RokoCalendar, CalendarTheme, CalendarRange } from "../../../src/";
import Header from "./Header";

const calendarStyle: CalendarTheme = {
  colors: {
    primary: "#FF5733",
    onPrimary: "white",
    secondary: "#FFF9C4",
    onSecondary: "#9E9E9E",
    background: materialColors.grey._50 ?? "white",
    onBackground: "#000000",
    disabled: materialColors.red._300 ?? "white",
  },
  font: {},
};

export const DatePicker = () => {
  // #region members
  // #endregion
  // #region states
  const [mode, toggleMode] = useState<"single" | "range">("range");
  const [range, setRange] = useState<CalendarRange>([new Date()]);
  // #endregion
  // #region functions
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
  // #region effects
  // #endregion
  return (
    <View style={styles.root}>
      <Header
        {...{
          title: "Single Picker",
          range,
          mode,
        }}
      />
      <View style={{ height: 400 }}>
        <RokoCalendar mode={mode} range={range} setRange={setRange} theme={calendarStyle} />
      </View>
      <Switch value={mode === "range"} onChange={() => handleToggleMode()} />
    </View>
  );
};

const styles = StyleSheet.create({ root: { gap: 16, flex: 1, justifyContent: "flex-start" } });
```
