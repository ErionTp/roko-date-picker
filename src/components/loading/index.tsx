import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { tTheme } from "../../features/domain/types/t.theme";
import { useMain, useStyles } from "../../features/hooks";

type Props = {};

const Loading: FC<Props> = ({}) => {
  // #region members
  const { theme } = useMain();
  // #endregion
  // #region variables
  const customStyles = useStyles(styles, theme);
  // #endregion
  return (
    <View style={customStyles.root}>
      <ActivityIndicator color={theme?.colors.primary} />
    </View>
  );
};

export default Loading;

Loading.displayName = "Loading";

const styles = (theme: tTheme) =>
  StyleSheet.create({ root: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background } });
