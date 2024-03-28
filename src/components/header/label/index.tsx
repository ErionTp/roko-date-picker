import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC, useCallback } from "react";
import { format } from "date-fns";
import { eCalendarPicker } from "../../../features/domain/enums/e.calendar.picker";
import { tTheme } from "../../../features/domain/types/t.theme";
import { sizes } from "../../../features/domain/constants";
import { useMain, useStyles } from "../../../features/hooks";

type Props = {};
const Label: FC<Props> = ({}) => {
  // #region members
  const { currentDate, setPickerType, theme } = useMain();
  // #endregion
  // #region functions
  const handleOnCalendarTypeChange = useCallback(() => {
    setPickerType((prevType) => {
      const nextType = (prevType + 1) % (Object.keys(eCalendarPicker).length / 2);
      return nextType;
    });
  }, []);
  // #endregion
  // #region variables
  const customStyle = useStyles(styles, theme);
  // #endregion
  return (
    <TouchableOpacity style={customStyle.root} onPress={handleOnCalendarTypeChange}>
      <Text numberOfLines={1} adjustsFontSizeToFit={true} style={customStyle.label}>
        {format(currentDate, "MMMM, yyyy")}
      </Text>
    </TouchableOpacity>
  );
};

export default Label;

Label.displayName = "Label";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontSize: sizes.moderate,
      color: theme.colors.onBackground,
      textTransform: "capitalize",
      fontFamily: theme.font.family,
    },
  });
