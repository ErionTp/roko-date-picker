import { StyleSheet, View } from "react-native";
import React, { FC, memo } from "react";
import { isToday } from "date-fns";
import { moderateScale } from "../../../../../features/domain/constants/scale";
import { tTheme } from "../../../../../features/domain/types/t.theme";
import useMain from "../../../../../features/hooks/useMain";
import useStyles from "../../../../../features/hooks/useStyles";

interface Props {
  selected: boolean;
  item: Date;
}
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

const styles = (theme: Partial<tTheme>) =>
  StyleSheet.create({
    root: { height: 3, width: 3, borderRadius: 3, backgroundColor: theme.onSecondary, position: "absolute", bottom: moderateScale(3) },
    selectedBackground: { backgroundColor: theme.background },
  });
