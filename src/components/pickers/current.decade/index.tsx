import { FlatList } from "react-native";
import React, { FC, useMemo } from "react";
import useMain from "../../../features/hooks/useMain";
import { getYearsOfCurrentDecade } from "../../../features/common";
import defaults from "../../../features/domain/constants/defaults";
import Cell from "./cell";
import isSameYear from "date-fns/isSameYear";

type Props = {};
const CurrentYear: FC<Props> = ({}) => {
  // #region Members
  const { currentDate, containerMeasures, theme, onSetCurrentDate } = useMain();
  // #endregion
  // #region States
  const data = useMemo(() => getYearsOfCurrentDecade(currentDate), [currentDate]);
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
        const selected = isSameYear(item, currentDate);
        return <Cell {...{ item, selected, theme, onChange: onSetCurrentDate }} />;
      }}
    />
  );
};

export default CurrentYear;

CurrentYear.displayName = "CurrentYear";
