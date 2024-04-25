import { FlatList } from "react-native";
import React, { FC, useMemo } from "react";
import { getMonthsOfCurrentYear } from "../../../features/common";
import Cell from "./cell";
import isSameMonth from "date-fns/isSameMonth";
import { defaults } from "../../../features/domain/constants";
import { useMain } from "../../../features/hooks";
import { isSameYear } from "date-fns";

type Props = {};

const CurrentYear: FC<Props> = ({}) => {
  // #region members
  const { currentDate, containerMeasures, theme, onSetCurrentDate } = useMain();
  // #endregion
  // #region states
  const data = useMemo(() => getMonthsOfCurrentYear(currentDate), [currentDate]);
  // #endregion
  // #region variables
  const height = useMemo(() => (containerMeasures.height - defaults.header.height) / 4, [containerMeasures, data.length]);
  const render = ({ item, index }: { item: Date; index: number }) => {
    const selected = isSameMonth(item, currentDate) && isSameYear(item, currentDate);

    const props = { item, selected, theme, onChange: onSetCurrentDate, index };

    return <Cell {...props} />;
  };
  // #endregion
  return <FlatList data={data} numColumns={3} columnWrapperStyle={{ height }} renderItem={render} />;
};

export default CurrentYear;

CurrentYear.displayName = "CurrentYear";
