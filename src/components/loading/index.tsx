import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { FC } from "react";
import useMain from "../../features/hooks/useMain";
import useStyles from "../../features/hooks/useStyles";
import { tTheme } from "../../features/domain/types/t.theme";

type Props = {};

const Loading: FC<Props> = ({}) => {
  // #region Members
  const { theme } = useMain();
  // #endregion
  // #region States
  // #endregion
  // #region Custom hooks
  // #endregion
  // #region Functions
  // #endregion
  // #region Effects
  // #endregion
  // #region Variables
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
