import { FlatList, StyleSheet, View } from "react-native";
import React, { FC, memo, useMemo } from "react";
import { getWeeksOfCurrentMonth } from "../../../features/common";
import useMain from "../../../features/hooks/useMain";
import { isSameMonth, isSameDay, endOfDay } from "date-fns";
import { tWeekData } from "../../../features/domain/types/t.data.week";
import { selectedDay, isBetweenDates } from "../../../features/domain/utils/common";
import Cell from "./cell";
import defaults from "../../../features/domain/constants/defaults";
import BetweenIndicator from "./indicators/indicator.between";
import useStyles from "../../../features/hooks/useStyles";
import WeekLabels from "../../header/weeks";
import Loading from "../../loading";
import isPast from "date-fns/isPast";

type Props = {};
const CurrentMonth: FC<Props> = ({}) => {
  // #region Members
  const { currentDate, range, mode, containerMeasures, onChange, theme, blockedDates, blockPast } = useMain();
  // #endregion
  // #region States
  const data = useMemo(() => {
    return getWeeksOfCurrentMonth(currentDate);
  }, [currentDate]);
  // #endregion
  // #region Variables
  const height = useMemo(
    () => (containerMeasures.height - defaults.header.height - defaults.labels.height) / data.length,
    [containerMeasures, data.length]
  );
  const width = useMemo(() => containerMeasures.width / 7, [containerMeasures, data.length]);
  const weekData = useMemo(() => {
    return data.flat().map((day) => {
      const blocked =
        (blockedDates ? blockedDates.some((i) => isSameDay(day, i)) : false) || (blockPast ? blockPast && isPast(endOfDay(day)) : false);
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
  const renderItem = (item: tWeekData) => {
    const { day, selected, sameMonth, isBetween, firstSelection, secondSelection, blocked } = item;
    return (
      <View key={item.day.toISOString()} style={{ flex: 1, justifyContent: "center" }}>
        {mode === "range" && range[1] !== undefined && isBetween && (
          <BetweenIndicator {...{ size: width, isBetween, firstSelection, secondSelection }} />
        )}
        <Cell {...{ item: day, selected: selected, onChange, sameMonth, width, height, theme, blocked }} />
      </View>
    );
  };
  const customStyles = useStyles(styles, theme);
  const getItemLayout = (_data: ArrayLike<tWeekData> | null | undefined, index: number) => ({
    length: height,
    offset: height * index,
    index,
  });
  // #endregion
  return (
    <View style={customStyles.root}>
      <WeekLabels />
      {containerMeasures.height === 0 ? (
        <Loading />
      ) : (
        <FlatList
          numColumns={7}
          data={weekData}
          scrollEnabled={false}
          getItemLayout={getItemLayout}
          columnWrapperStyle={{ height }}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => renderItem(item)}
        />
      )}
    </View>
  );
};

export default CurrentMonth;

CurrentMonth.displayName = "CurrentMonth";

const styles = () =>
  StyleSheet.create({
    root: { flex: 1 },
  });
