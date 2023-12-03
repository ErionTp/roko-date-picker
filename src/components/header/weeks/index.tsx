import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { tTheme } from "../../../features/domain/types/t.theme";
import useMain from "../../../features/hooks/useMain";
import useStyles from "../../../features/hooks/useStyles";
import defaults from "../../../features/domain/constants/defaults";
import sizes from "../../../features/domain/constants/sizes";

const WeekLabels = () => {
  // #region Members
  const { theme } = useMain();
  // #endregion
  // #region Variables
  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i));
    }

    return days;
  }, []);

  const customStyles = useStyles(styles, theme);
  // #endregion
  return (
    <View style={customStyles.root}>
      {weekDays.map((item, index) => (
        <View style={customStyles.container} key={index}>
          <Text style={customStyles.label}>{format(item, "EEE")}</Text>
        </View>
      ))}
    </View>
  );
};

export default WeekLabels;

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      height: defaults.labels.height,
      borderBottomColor: theme.colors.onSecondary,
    },
    container: { alignItems: "center", justifyContent: "center", flex: 1 },
    label: { fontSize: sizes.medium, textTransform: "capitalize", color: theme.colors.onBackground, fontFamily: theme.font?.family },
  });
