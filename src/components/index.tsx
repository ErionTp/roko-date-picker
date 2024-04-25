import { StyleSheet, View } from "react-native";
import React, { FC, useEffect, useMemo } from "react";
import { tPicker } from "../features/domain/types/t.picker";
import Header from "./header";
import { tTheme } from "../features/domain/types/t.theme";
import { ShowComponent } from "./show";
import Loading from "./loading";
import { useLayout, useMain, useStyles } from "../features/hooks";
import CurrentYear from "./pickers/year";
import CurrentMonth from "./pickers/month";
import CurrentDecade from "./pickers/decade";

type Props = { layoutProps?: { width: number; height: number } };

const MainContainer: FC<Props> = ({ layoutProps = { height: 360, width: 350 } }) => {
  // #region members
  const { pickerType, setContainerMeasures, theme, currentDate } = useMain();
  // #endregion
  // #region variables
  const customStyles = useStyles(styles, theme, layoutProps);
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

const styles = (theme: tTheme, layoutProps: { width: number; height: number }) =>
  StyleSheet.create({
    root: {
      height: layoutProps.height,
      width: layoutProps.width,
      overflow: "hidden",
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
    },
  });
