import { StyleSheet, View } from "react-native";
import React, { FC, useEffect } from "react";
import CurrentMonth from "./pickers/current.month";
import CurrentYear from "./pickers/current.year";
import { tPicker } from "../features/domain/types/t.picker";
import CurrentDecade from "./pickers/current.decade";
import Header from "./header";
import { tTheme } from "../features/domain/types/t.theme";
import { ShowComponent } from "./show";
import Loading from "./loading";
import { useLayout, useMain, useStyles } from "../features/hooks";
import { defaults } from "../features/domain/constants";

type Props = { parentHeight?: number };

const MainContainer: FC<Props> = ({ parentHeight = 360 }) => {
  // #region members
  const { pickerType, setContainerMeasures, theme } = useMain();
  // #endregion
  // #region variables
  const customStyles = useStyles(styles, theme, parentHeight);
  // #endregion
  // #region hooks
  const [{ measured, width, height }, onLayout] = useLayout();
  // #endregion
  // #region effects
  useEffect(() => {
    if (measured) setContainerMeasures({ width, height });
  }, [measured, height]);
  // #endregion
  // #region renders
  const renderItem: tPicker = {
    0: <CurrentMonth />,
    1: <CurrentYear />,
    2: <CurrentDecade />,
  };
  // #endregion
  return (
    <View onLayout={onLayout} style={customStyles.root}>
      <ShowComponent>
        <ShowComponent.When isTrue={measured}>
          <View style={customStyles.container}>
            <Header />
            {renderItem[pickerType]}
          </View>
        </ShowComponent.When>
        <ShowComponent.Else>
          <Loading />
        </ShowComponent.Else>
      </ShowComponent>
    </View>
  );
};

export default MainContainer;

MainContainer.displayName = "MainContainer";

const styles = (theme: tTheme, height: number) =>
  StyleSheet.create({
    root: {
      height,
      overflow: "hidden",
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
    },
  });
