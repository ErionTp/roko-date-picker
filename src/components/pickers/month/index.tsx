import { FlatList, StyleSheet, View } from "react-native";
import React, { FC, useMemo } from "react";
import { getItemLayout, getWeeksOfCurrentMonth } from "../../../features/common";
import { isSameMonth, isSameDay, endOfDay, getDay } from "date-fns";
import { tWeekData } from "../../../features/domain/types/t.data.week";
import { selectedDay, isBetweenDates } from "../../../features/domain/utils/common";
import Cell from "./cell";
import BetweenIndicator from "./indicators/indicator.between";
import WeekLabels from "../../header/weeks";
import isPast from "date-fns/isPast";
import { defaults } from "../../../features/domain/constants";
import { useMain } from "../../../features/hooks";

type Props = {};

const CurrentMonth: FC<Props> = ({}) => {
  // #region members
  const { currentDate, range, mode, onChange, containerMeasures, theme, blockedDates, blockPast, blockedWeekDay } = useMain();
  // #endregion
  // #region states
  const data = useMemo(() => {
    return getWeeksOfCurrentMonth(currentDate);
  }, [currentDate]);
  // #endregion
  // #region variables
  const cellLayout = useMemo(() => {
    const width = containerMeasures.width / 7;
    const height = (containerMeasures.height - defaults.header.height - defaults.weekLabel.height) / data.length;
    return { width, height };
  }, [containerMeasures, data.length]);

  const weekData = useMemo(() => {
    return data.flat().map((day) => {
      const blockedByWeekDay = blockedWeekDay ? blockedWeekDay.some((i) => i === getDay(day)) : false;
      const blocked =
        (blockedDates ? blockedDates.some((i) => isSameDay(day, i)) : false) ||
        (blockPast ? blockPast && isPast(endOfDay(day)) : false) ||
        blockedByWeekDay;
      const selected = selectedDay(range, day) && !blocked;
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
        blocked,
      };

      return payload;
    });
  }, [data, range, mode, blockedDates, blockPast]);

  const renderItem = ({ item, index }: { item: tWeekData | null | undefined; index: number }) => {
    if (!item) return null;
    const { day, selected, sameMonth, isBetween, firstSelection, secondSelection, blocked } = item;
    return (
      <View key={item.day.toISOString()} style={{ flex: 1, justifyContent: "center" }}>
        {mode === "range" && range[1] !== undefined && isBetween && (
          <BetweenIndicator {...{ size: cellLayout.width, isBetween, firstSelection, secondSelection }} />
        )}
        <Cell item={day} selected={selected} onChange={onChange} sameMonth={sameMonth} theme={theme} blocked={blocked} index={index} />
      </View>
    );
  };

  // #endregion
  return (
    <View style={styles.root}>
      <WeekLabels />
      <FlatList
        numColumns={7}
        data={weekData}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
        columnWrapperStyle={{ height: cellLayout.height, width: containerMeasures.width }}
        getItemLayout={(data: ArrayLike<tWeekData> | null | undefined, index: number) => getItemLayout(data, index, cellLayout)}
      />
    </View>
  );
};

export default CurrentMonth;

CurrentMonth.displayName = "CurrentMonth";

const styles = StyleSheet.create({
  root: { flex: 1 },
});
