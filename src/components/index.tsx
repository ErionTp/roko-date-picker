import { StyleSheet, View } from "react-native";
import React, { FC, useMemo } from "react";
import CurrentMonth from "./pickers/current.month";
import CurrentYear from "./pickers/current.year";
import { tPicker } from "../features/domain/types/t.picker";
import CurrentDecade from "./pickers/current.decade";
import Header from "./header";
import useMain from "../features/hooks/useMain";
import { defaultTheme } from "../features/domain/data/data.defaults";
import { tTheme } from "../features/domain/types/t.theme";

type Props = {};
const MainContainer: FC<Props> = ({}) => {
  // #region Members
  const { pickerType, setContainerMeasures, theme } = useMain();
  // #endregion
  // #region States
  // #endregion
  // #region Custom hooks
  // #endregion
  // #region Functions
  // #endregion
  // #region Variables
  const customStyles = useMemo(() => styles(theme ?? defaultTheme), [theme]);
  // #endregion
  // #region Renders
  const Calendar: tPicker = {
    0: <CurrentMonth />,
    1: <CurrentYear />,
    2: <CurrentDecade />,
  };
  // #endregion
  return (
    <View onLayout={(e) => setContainerMeasures(e.nativeEvent.layout)} style={customStyles.root}>
      <Header />
      {Calendar[pickerType]}
    </View>
  );
};

export default MainContainer;

MainContainer.displayName = "MainContainer";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
