import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC, useCallback } from "react";
import { format } from "date-fns";
import { eCalendarPicker } from "../../../features/domain/enums/e.calendar.picker";
import { tTheme } from "../../../features/domain/types/t.theme";
import { useMain, useStyles } from "../../../features/hooks";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { sizes } from "../../../features/domain/constants";
import { defaultTheme } from "../../../features/domain/data/data.defaults";

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
      <Text numberOfLines={1} style={customStyle.label}>
        {format(currentDate, "MMMM, yyyy")}
      </Text>
      <MaterialCommunityIcons
        size={sizes.regular}
        name={"chevron-down"}
        color={(theme ?? defaultTheme).colors.onBackground}
      />
    </TouchableOpacity>
  );
};

export default Label;

Label.displayName = "Label";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      gap: sizes.tiny,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    label: {
      fontSize: 14,
      textTransform: "capitalize",
      fontFamily: theme.font.family,
      color: theme.colors.onBackground,
    },
  });
