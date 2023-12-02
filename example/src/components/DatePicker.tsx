import { StyleSheet, Switch, View } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "./Header";
import { materialColors, RokoCalendar } from "../../../src/";

const calendarStyle = {
  primary: "#FF5733",
  onPrimary: "white",
  secondary: "#FFF9C4",
  onSecondary: "#9E9E9E",
  background: "#DAF7A6",
  onBackground: "#000000",
};

const DatePicker = () => {
  // #region States
  const [mode, toggleMode] = useState<"single" | "range">("range");
  const [range, setRange] = useState<[Date] | [Date, Date | undefined]>([new Date()]);
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
      <View style={{ height: 340, backgroundColor: materialColors.grey._200, borderRadius: 16, overflow: "hidden" }}>
        <RokoCalendar {...{ mode, range, setRange }} />
      </View>
      <Switch value={mode === "range"} onChange={() => handleToggleMode()} />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({ root: { gap: 16, flex: 1 } });
