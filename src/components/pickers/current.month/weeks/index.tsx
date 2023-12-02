import { StyleSheet, View } from "react-native";
import React, { FC, useMemo } from "react";
import defaults from "../../../../features/domain/constants/defaults";
import Day from "../day";
import isSameMonth from "date-fns/isSameMonth";
import { tWeekData } from "../../../../features/domain/types/t.data.week";
import { isBetweenDates, selectedDay } from "../../../../features/domain/utils/common";
import useMain from "../../../../features/hooks/useMain";
import Indicator from "../indicator.between";
import isSameDay from "date-fns/isSameDay";

type Props = {
  week: Date[];
  weeksLength: number;
};
const Weeks: FC<Props> = ({ week, weeksLength }) => {
  // #region Members
  const { containerMeasures, range, onChange, currentDate, mode } = useMain();
  // #endregion
  // #region States
  const height = useMemo(() => (containerMeasures.height - defaults.header.height) / weeksLength, [containerMeasures, weeksLength]);
  const width = useMemo(() => containerMeasures.width / 7, [containerMeasures, weeksLength]);
  // #endregion
  // #region Variables
  const weekData = useMemo(() => {
    return week.map((day) => {
      const selected = selectedDay(range, day);
      const sameMonth = isSameMonth(day, currentDate);
      const isBetween = mode === "range" ? isBetweenDates(day, range[0], range[1] ?? range[0]) : false;
      const firstSelection = mode === "range" ? isSameDay(day, range[0]) : false;
      const secondSelection = mode === "range" ? isSameDay(day, range[1] ?? range[0]) : false;

      const payload: tWeekData = {
        day,
        selected,
        sameMonth,
        isBetween,
        firstSelection,
        secondSelection,
      };

      return payload;
    });
  }, [week, range, mode]);
  // #endregion
  // #region Functions
  const renderItem = (item: tWeekData, index: number) => {
    const { day, selected, sameMonth, isBetween, firstSelection, secondSelection } = item;
    return (
      <View key={index} style={{ flex: 1, justifyContent: "center" }}>
        {mode === "range" && range[1] !== undefined && isBetween && <Indicator {...{ size: width, isBetween, firstSelection, secondSelection }} />}
        <Day key={index} {...{ item: day, selected: selected, onChange, sameMonth, width, height }} />
      </View>
    );
  };
  // #endregion
  // #region Actions
  if (containerMeasures.height === 0 || containerMeasures.width === 0) return null;
  // #endregion
  return <View style={[styles.root, { height }]}>{weekData.map(renderItem)}</View>;
};

export default Weeks;

Weeks.displayName = "Weeks";

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
  },
});
