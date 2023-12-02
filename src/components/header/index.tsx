import { StyleSheet, View } from "react-native";
import React, { FC, useCallback } from "react";
import Chevron from "../chevron";
import Label from "./label";
import defaults from "../../features/domain/constants/defaults";
import useMain from "../../features/hooks/useMain";
import { eCalendarPicker } from "../../features/domain/enums/e.calendar.picker";

type Props = {};
const Header: FC<Props> = ({}) => {
  // #region Members
  const { pickerType, setCurrentDate } = useMain();
  // #endregion
  // #region Functions
  const handleOnPrevious = useCallback(
    (isNext: boolean) => {
      setCurrentDate((prev) => {
        const newDate = new Date(prev);
        const value1 = isNext ? +1 : -1;
        const value2 = isNext ? +12 : -12;
        switch (pickerType) {
          case eCalendarPicker.currentYear:
            newDate.setFullYear(newDate.getFullYear() + value1);
            break;
          case eCalendarPicker.currentDecade:
            newDate.setFullYear(newDate.getFullYear() + value2);
            break;
          case eCalendarPicker.currentMonth:
          default:
            newDate.setMonth(newDate.getMonth() + value1);
            break;
        }
        return newDate;
      });
    },
    [pickerType]
  );
  // #endregion
  return (
    <View style={styles.root}>
      <Chevron name="chevron-left" onPress={() => handleOnPrevious(false)} />
      <Label />
      <Chevron name="chevron-right" onPress={() => handleOnPrevious(true)} />
    </View>
  );
};

export default Header;

Header.displayName = "Header";

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    height: defaults.header.height,
  },
});
