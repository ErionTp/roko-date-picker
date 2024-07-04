import React, { FC } from "react";
import { MainProvider } from "../features/providers/main";
import { tApp } from "../features/domain/types/t.app";
import MainContainer from "../components";
import { View } from "react-native";
import { useLayout } from "../features/hooks";
import { ShowComponent } from "../components/show";
import Loading from "../components/loading";
import { tLayoutRectangle } from "../features/domain/types/t.layout.rectangle";

type Props = tApp & {
  layoutProps?: tLayoutRectangle;
};
const RokoCalendar: FC<Props> = (props) => {
  // #region members
  // #endregion
  // #region hooks
  const [{ measured, height, width }, onLayout] = useLayout();
  // #endregion

  return (
    <MainProvider {...props} containerMeasures={props.layoutProps ?? { height, width }}>
      <View
        onLayout={onLayout}
        style={{ height: props.layoutProps?.height, width: props.layoutProps?.width }}
      >
        <ShowComponent>
          <ShowComponent.When isTrue={measured}>
            <MainContainer />
          </ShowComponent.When>
          <ShowComponent.Else>
            <Loading />
          </ShowComponent.Else>
        </ShowComponent>
      </View>
    </MainProvider>
  );
};

export default RokoCalendar;

RokoCalendar.displayName = "RokoCalendar";
