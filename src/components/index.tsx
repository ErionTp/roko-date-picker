import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import CurrentMonth from "./pickers/current.month";
import CurrentYear from "./pickers/current.year";
import { tPicker } from "../features/domain/types/t.picker";
import CurrentDecade from "./pickers/current.decade";
import Header from "./header";
import useMain from "../features/hooks/useMain";
import { tTheme } from "../features/domain/types/t.theme";
import useStyles from "../features/hooks/useStyles";

type Props = {};
const MainContainer: FC<Props> = ({}) => {
  // #region Members
  const { pickerType, setContainerMeasures, theme } = useMain();
  // #endregion
  // #region Variables
  const customStyles = useStyles(styles, theme);
  // #endregion
  // #region Renders
  const renderItem: tPicker = {
    0: <CurrentMonth />,
    1: <CurrentYear />,
    2: <CurrentDecade />,
  };
  // #endregion
  return (
    <View onLayout={(e) => setContainerMeasures(e.nativeEvent.layout)} style={customStyles.root}>
      <Header />
      {renderItem[pickerType]}
    </View>
  );
};

export default MainContainer;

MainContainer.displayName = "MainContainer";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
