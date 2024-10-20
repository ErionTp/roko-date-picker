import { StyleSheet, View } from "react-native";
import React, { FC, useMemo } from "react";
import { getWeeksOfCurrentMonth } from "../../../features/common";
import { isSameMonth, isSameDay, endOfDay, getDay, isBefore, startOfDay, isAfter } from "date-fns";
import { tWeekData } from "../../../features/domain/types/t.data.week";
import { selectedDay, isBetweenDates } from "../../../features/domain/utils/common";
import BetweenIndicator from "./indicators/indicator.between";
import WeekLabels from "../../header/weeks";
import { useMain } from "../../../features/hooks";
import Cell from "./cell";
import { ShowComponent } from "../../show";
import Each from "../../each";
import { defaults } from "../../../features/domain/constants";

type Props = {};

const CELL_CONTAINER = defaults.root.height - defaults.header.height - defaults.weekLabel.height;

const CurrentMonth: FC<Props> = ({}) => {
  // #region members
  const {
    currentDate,
    range,
    mode,
    onChange,
    theme,
    blockedDates,
    minDate,
    maxDate,
    blockedWeekDay,
  } = useMain();
  // #endregion
  // #region states
  const data = useMemo(() => {
    return getWeeksOfCurrentMonth(currentDate);
  }, [currentDate]);
  // #endregion
  // #region hooks
  // #endregion
  // #region variables
  const weekData = useMemo(() => {
    return data.flat().map((day) => {
      const blockedByWeekDay = blockedWeekDay
        ? blockedWeekDay.some((i) => i === getDay(day))
        : false;
      const blocked =
        (blockedDates ? blockedDates.some((i) => isSameDay(day, i)) : false) ||
        (minDate ? isBefore(startOfDay(day), startOfDay(minDate)) : false) ||
        (maxDate ? isAfter(endOfDay(day), endOfDay(maxDate)) : false) ||
        blockedByWeekDay;
      const selected = selectedDay(range, day) && !blocked;
      const sameMonth = isSameMonth(day, currentDate);
      const isBetween =
        mode === "range" ? isBetweenDates(day, range[0], range[1] ?? range[0]) : false;
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
  }, [data, range, mode, blockedDates, minDate]);

  const cellHeight = useMemo(() => {
    return CELL_CONTAINER / (weekData.length / 7);
  }, [weekData]);

  const renderItem = (item: tWeekData | null | undefined, index: number) => {
    if (!item) return null;
    const { day, selected, sameMonth, isBetween, firstSelection, secondSelection, blocked } = item;
    return (
      <View
        style={{
          flex: 1,
          height: cellHeight,
          minWidth: `${100 / 7}%`,
        }}
      >
        <ShowComponent>
          <ShowComponent.When isTrue={mode === "range" && range[1] !== undefined && isBetween}>
            <BetweenIndicator {...{ isBetween, firstSelection, secondSelection }} />
          </ShowComponent.When>
        </ShowComponent>

        <Cell
          item={day}
          index={index}
          theme={theme}
          blocked={blocked}
          selected={selected}
          onChange={onChange}
          sameMonth={sameMonth}
          weekNumber={weekData.length / 7}
        />
      </View>
    );
  };

  // #endregion
  return (
    <View style={styles.root}>
      <WeekLabels />
      <View style={styles.listContainer}>
        <Each of={weekData} render={renderItem} />
      </View>
    </View>
  );
};

export default CurrentMonth;

CurrentMonth.displayName = "CurrentMonth";

const styles = StyleSheet.create({
  root: { flex: 1 },
  listContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    height: defaults.root.height,
  },
});
