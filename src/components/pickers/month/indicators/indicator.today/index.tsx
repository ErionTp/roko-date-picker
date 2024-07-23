import { StyleSheet, View } from "react-native";
import React, { FC, memo } from "react";
import { isToday } from "date-fns";
import { tTheme } from "../../../../../features/domain/types/t.theme";
import { sizes } from "../../../../../features/domain/constants";
import { useMain, useStyles } from "../../../../../features/hooks";

interface Props {
  selected: boolean;
  item: Date;
}

const SIZE = sizes.tiny;

const TodayIndicator: FC<Props> = ({ selected, item }) => {
  // #region Members
  const { theme } = useMain();
  // #endregion
  // #region Variables
  const customStyle = useStyles(styles, theme);
  // #endregion
  // #region Action
  if (!isToday(item)) return null;
  // #endregion
  return <View style={[customStyle.root, selected && customStyle.selectedBackground]} />;
};

export default memo(TodayIndicator);

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      height: SIZE,
      width: SIZE,
      borderRadius: SIZE / 2,
      backgroundColor: theme.colors.onSecondary,
      position: "absolute",
      bottom: 3,
    },
    selectedBackground: { backgroundColor: theme.colors.background },
  });
