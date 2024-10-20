import React, { FC } from "react";
import { MainProvider } from "../features/providers/main";
import { tApp } from "../features/domain/types/t.app";
import MainContainer from "../components";

type Props = tApp;

const RokoCalendar: FC<Props> = (props) => {
  // #region members
  // #endregion
  // #region hooks
  // #endregion
  return (
    <MainProvider {...props}>
      <MainContainer />
    </MainProvider>
  );
};

export default RokoCalendar;

RokoCalendar.displayName = "RokoCalendar";
