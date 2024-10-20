import { FlatList, StyleSheet, View } from "react-native";
import React, { FC, useMemo } from "react";
import { getMonthsOfCurrentYear } from "../../../features/common";
import Cell from "./cell";
import isSameMonth from "date-fns/isSameMonth";
import { useMain } from "../../../features/hooks";
import { isSameYear } from "date-fns";
import Each from "../../each";

type Props = {};

const CurrentYear: FC<Props> = ({}) => {
  // #region members
  const { currentDate, theme, onSetCurrentDate } = useMain();
  // #endregion
  // #region states
  const data = useMemo(() => getMonthsOfCurrentYear(currentDate), [currentDate]);
  // #endregion
  // #region variables

  const render = ({ item, index }: { item: Date; index: number }) => {
    const selected = isSameMonth(item, currentDate) && isSameYear(item, currentDate);

    const props = { item, selected, theme, onChange: onSetCurrentDate, index };

    return <Cell {...props} />;
  };
  // #endregion
  return (
    <View style={styles.root}>
      <Each of={data} render={(item, index) => render({ item, index })} />
    </View>
  );
};

export default CurrentYear;

CurrentYear.displayName = "CurrentYear";

const styles = StyleSheet.create({
  root: { flexDirection: "row", flexWrap: "wrap", flex: 1, alignItems: "center" },
});
