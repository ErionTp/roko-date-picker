import { StyleSheet, View } from "react-native";
import React, { FC, memo } from "react";
import { isToday } from "date-fns";
import { moderateScale } from "../../../../../features/domain/constants/scale";
import { tTheme } from "../../../../../features/domain/types/t.theme";
import useMain from "../../../../../features/hooks/useMain";
import useStyles from "../../../../../features/hooks/useStyles";
import sizes from "../../../../../features/domain/constants/sizes";

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
      bottom: moderateScale(3),
    },
    selectedBackground: { backgroundColor: theme.colors.background },
  });
