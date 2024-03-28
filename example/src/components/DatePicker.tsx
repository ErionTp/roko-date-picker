import { StyleSheet, Switch, View } from "react-native";
import React, { useCallback, useState } from "react";
import { materialColors, RokoCalendar, Theme, Range } from "../../../src/";
import { useSharedValue } from "react-native-reanimated";
import Header from "./Header";

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

export const DatePicker = () => {
  // #region members
  const animatedValue = useSharedValue(0);
  // #endregion
  // #region states
  const [mode, toggleMode] = useState<"single" | "range">("range");
  const [range, setRange] = useState<Range>([new Date()]);
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
  // #region variables
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
      <View style={[{ height: 360, backgroundColor: materialColors.grey._200, borderRadius: 16, overflow: "hidden" }]}>
        <RokoCalendar
          {...{
            mode,
            range,
            setRange,
            theme: calendarStyle,
          }}
        />
      </View>
      <Switch value={mode === "range"} onChange={() => handleToggleMode()} />
    </View>
  );
};

const styles = StyleSheet.create({ root: { gap: 16, flex: 1 } });
