import { StyleSheet, Switch, View } from "react-native";
import React, { useCallback, useState } from "react";
import { materialColors, RokoCalendar, CalendarTheme, CalendarRange } from "../../../src/";
import Header from "./Header";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
  const animatedValue = useSharedValue(1);
  // #endregion
  // #region states
  const [mode, toggleMode] = useState<"single" | "range">("range");
  const [range, setRange] = useState<CalendarRange>([new Date()]);
  const [visible, setVisible] = useState<boolean>(false);
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

  const rStyle = useAnimatedStyle(() => {
    const height = interpolate(animatedValue.value, [0, 1], [0, 380]);
    return { height };
  });

  const handleShowCalendar = () => {
    animatedValue.value = withTiming(1, { duration: 150 });
  };
  const handleDismissCalendar = () => {
    animatedValue.value = withTiming(0, { duration: 150 });
  };

  const handleOnPressTitle = useCallback(() => {
    visible ? handleDismissCalendar() : handleShowCalendar();
  }, [visible]);
  // #endregion
  // #region effects
  useDerivedValue(() => runOnJS(setVisible)(animatedValue.value > 0), []);
  // #endregion
  return (
    <View style={styles.root}>
      <Header
        {...{
          title: "Single Picker",
          range,
          mode,
          onPress: handleOnPressTitle,
        }}
      />
      <Animated.View
        style={[
          { backgroundColor: materialColors.grey._200, borderRadius: 16, overflow: "hidden" },
          rStyle,
        ]}
      >
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
