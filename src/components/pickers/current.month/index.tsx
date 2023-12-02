import { FlatList, StyleSheet, View } from "react-native";
import React, { FC, useMemo } from "react";
import Weeks from "./weeks";
import { getCurrentMonthWeek } from "../../../features/common";
import useMain from "../../../features/hooks/useMain";

type Props = {};
const CurrentMonth: FC<Props> = ({}) => {
  // #region Members
  const { currentDate } = useMain();
  // #endregion
  // #region States
  const weeks = useMemo(() => getCurrentMonthWeek(currentDate), [currentDate]);
  // #endregion
  // #region Custom hooks
  // #endregion
  // #region Functions
  // #endregion
  // #region Effects
  // #endregion
  // #region Variables
  // #endregion
  return (
    <FlatList
      data={weeks}
      scrollEnabled={false}
      initialNumToRender={weeks.length}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({ item }) => <Weeks {...{ week: item, weeksLength: weeks.length }} />}
    />
  );
};

export default CurrentMonth;

CurrentMonth.displayName = "CurrentMonth";
