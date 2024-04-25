import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useMain, useStyles } from "../../features/hooks";
import { tTheme } from "../../features/domain/types/t.theme";
import { sizes } from "../../features/domain/constants";

type Props = {
  visible: boolean;
};
const SquareCellIndicator: React.FC<Props> = ({ visible }) => {
  // #region custom hooks
  const { theme } = useMain();
  // #endregion
  // #region variables
  const customStyles = useStyles(styles, theme);
  if (!visible) return null;
  // #endregion
  return <View style={customStyles.root} />;
};

export default SquareCellIndicator;

SquareCellIndicator.displayName = "SquareCellIndicator";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: { height: 6, width: 24, borderRadius: 5, backgroundColor: theme?.colors.primary, position: "absolute", bottom: sizes.regular },
  });
