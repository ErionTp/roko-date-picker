import { FlatList, View } from "react-native";
import React, { FC, useMemo } from "react";
import { getWeeksOfCurrentMonth } from "../../../features/common";
import useMain from "../../../features/hooks/useMain";
import { isSameMonth, isSameDay } from "date-fns";
import { tWeekData } from "../../../features/domain/types/t.data.week";
import { selectedDay, isBetweenDates } from "../../../features/domain/utils/common";
import Day from "./day";
import defaults from "../../../features/domain/constants/defaults";
import BetweenIndicator from "./indicators/indicator.between";

type Props = {};
const CurrentMonth: FC<Props> = ({}) => {
  // #region Members
  const { currentDate, range, mode, containerMeasures, onChange, theme } = useMain();
  // #endregion
  // #region States
  const data = useMemo(() => getWeeksOfCurrentMonth(currentDate), [currentDate]);
  // #endregion
  // #region Variables
  const height = useMemo(() => (containerMeasures.height - defaults.header.height) / data.length, [containerMeasures, data.length]);
  const width = useMemo(() => containerMeasures.width / 7, [containerMeasures, data.length]);
  const weekData = useMemo(() => {
    return data.flat().map((day) => {
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
  }, [data, range, mode]);
  const renderItem = (item: tWeekData) => {
    const { day, selected, sameMonth, isBetween, firstSelection, secondSelection } = item;
    return (
      <View key={item.day.toISOString()} style={{ flex: 1, justifyContent: "center" }}>
        {mode === "range" && range[1] !== undefined && isBetween && (
          <BetweenIndicator {...{ size: width, isBetween, firstSelection, secondSelection }} />
        )}
        <Day {...{ item: day, selected: selected, onChange, sameMonth, width, height, theme }} />
      </View>
    );
  };
  // #endregion
  return (
    <FlatList
      numColumns={7}
      data={weekData}
      scrollEnabled={false}
      columnWrapperStyle={{ height }}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({ item }) => renderItem(item)}
    />
  );
};

export default CurrentMonth;

CurrentMonth.displayName = "CurrentMonth";
