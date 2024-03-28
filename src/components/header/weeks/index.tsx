import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { format } from "date-fns";
import { tTheme } from "../../../features/domain/types/t.theme";
import { weekDayList } from "../../../features/common";
import { defaults, sizes } from "../../../features/domain/constants";
import { useMain, useStyles } from "../../../features/hooks";

const WeekLabels = () => {
  // #region members
  const { theme } = useMain();
  // #endregion
  // #region variables
  const weekDays = useMemo(() => weekDayList(), []);
  const customStyles = useStyles(styles, theme);
  // #endregion
  return (
    <View style={customStyles.root}>
      {weekDays.map((item, index) => (
        <View style={customStyles.container} key={index}>
          <Text numberOfLines={1} adjustsFontSizeToFit={true} style={customStyles.label}>
            {format(item, "EEE")}
          </Text>
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
      borderBottomColor: theme.colors.onSecondary,
      height: defaults.weekLabel.height,
    },
    container: { alignItems: "center", justifyContent: "center", flex: 1 },
    label: { fontSize: sizes.medium, textTransform: "capitalize", color: theme.colors.onBackground, fontFamily: theme.font?.family },
  });
