import { StyleSheet, View } from "react-native";
import React, { FC, memo } from "react";
import { tPicker } from "../features/domain/types/t.picker";
import Header from "./header";
import { tTheme } from "../features/domain/types/t.theme";
import { useMain, useStyles } from "../features/hooks";
import CurrentDecade from "./pickers/decade";
import CurrentMonth from "./pickers/month";
import CurrentYear from "./pickers/year";
import { defaults } from "../features/domain/constants";

type Props = object;

const MainContainer: FC<Props> = () => {
  // #region members
  const { pickerType, theme } = useMain();
  // #endregion
  // #region variables
  const customStyles = useStyles(styles, theme);
  // #endregion
  // #region hooks
  // #endregion
  // #region effects
  // #endregion
  // #region renders
  const renderItem: tPicker = {
    0: <CurrentMonth />,
    1: <CurrentYear />,
    2: <CurrentDecade />,
  };
  // #endregion
  return (
    <View style={customStyles.root}>
      <Header />
      {renderItem[pickerType]}
    </View>
  );
};

export default memo(MainContainer);

MainContainer.displayName = "MainContainer";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      flexGrow: 1,
      minWidth: defaults.root.height,
      backgroundColor: theme.colors.background,
    },
  });
