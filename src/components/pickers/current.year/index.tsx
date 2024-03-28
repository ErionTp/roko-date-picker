import { FlatList } from "react-native";
import React, { FC, useMemo } from "react";
import { getMonthsOfCurrentYear } from "../../../features/common";
import Cell from "./cell";
import isSameMonth from "date-fns/isSameMonth";
import { defaults } from "../../../features/domain/constants";
import { useMain } from "../../../features/hooks";

type Props = {};

const CurrentYear: FC<Props> = ({}) => {
  // #region Members
  const { currentDate, containerMeasures, theme, onSetCurrentDate } = useMain();
  // #endregion
  // #region States
  const data = useMemo(() => getMonthsOfCurrentYear(currentDate), [currentDate]);
  // #endregion
  // #region Variables
  const height = useMemo(() => (containerMeasures.height - defaults.header.height) / 4, [containerMeasures, data.length]);
  // #endregion
  return (
    <FlatList
      data={data}
      numColumns={3}
      columnWrapperStyle={{ height }}
      renderItem={({ item }) => {
        const selected = isSameMonth(item, currentDate);
        return <Cell {...{ item, selected, theme, onChange: onSetCurrentDate }} />;
      }}
    />
  );
};

export default CurrentYear;

CurrentYear.displayName = "CurrentYear";
