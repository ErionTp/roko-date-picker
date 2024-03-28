import { StyleSheet, Switch, View } from "react-native";
import React, { useCallback, useState } from "react";
import { materialColors, RokoCalendar, Theme, Range } from "../../../src/";
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
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
  const [visible, setVisible] = useState(false);
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
  const handleShowCalendar = () => {
    if (visible)
      animatedValue.value = withTiming(0, { duration: 150 }, () => {
        runOnJS(setVisible)(false);
      });
    else {
      animatedValue.value = withSpring(360, { duration: 150 }, () => {
        runOnJS(setVisible)(true);
      });
    }
  };
  // #endregion
  // #region variables
  const rStyle = useAnimatedStyle(() => {
    return { height: animatedValue.value };
  });
  // #endregion
  return (
    <View style={styles.root}>
      <Header
        {...{
          title: "Single Picker",
          range,
          onPress: handleShowCalendar,
          mode,
        }}
      />
      <Animated.View style={[rStyle, { backgroundColor: materialColors.grey._200, borderRadius: 16, overflow: "hidden" }]}>
        <RokoCalendar
          {...{
            mode,
            range,
            setRange,
            theme: calendarStyle,
          }}
        />
      </Animated.View>
      <Switch value={mode === "range"} onChange={() => handleToggleMode()} />
    </View>
  );
};

const styles = StyleSheet.create({ root: { gap: 16, flex: 1 } });
