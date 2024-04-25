import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { tTheme } from "../../../features/domain/types/t.theme";
import { weekDayList } from "../../../features/common";
import { defaults, sizes } from "../../../features/domain/constants";
import { useMain, useStyles } from "../../../features/hooks";
import Each from "../../each";

const WeekLabels = () => {
  // #region members
  const { theme } = useMain();
  // #endregion
  // #region variables
  const weekDays = useMemo(() => weekDayList(), []);
  const customStyles = useStyles(styles, theme);
  // #endregion
  // #region renders
  const render = useCallback(
    (item: Date) => {
      return (
        <View style={customStyles.container}>
          <Text numberOfLines={1} adjustsFontSizeToFit={true} style={customStyles.label}>
            {format(item, "EEE")}
          </Text>
        </View>
      );
    },
    [theme]
  );
  // #endregion
  return (
    <View style={customStyles.root}>
      <Each of={weekDays} render={render} />
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
      height: defaults.weekLabel.height,
      borderBottomColor: theme.colors.onSecondary,
    },
    container: { alignItems: "center", justifyContent: "center", flex: 1 },
    label: { fontSize: sizes.medium, textTransform: "capitalize", color: theme.colors.onBackground, fontFamily: theme.font?.family },
  });
