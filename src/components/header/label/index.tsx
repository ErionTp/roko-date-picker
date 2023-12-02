import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";
import sizes from "../../../features/domain/constants/sizes";
import { eCalendarPicker } from "../../../features/domain/enums/e.calendar.picker";
import useMain from "../../../features/hooks/useMain";
import { defaultTheme } from "../../../features/domain/data/data.defaults";
import { tTheme } from "../../../features/domain/types/t.theme";

type Props = {};
const Label: FC<Props> = ({}) => {
  // #region Members
  const { currentDate, setPickerType, theme } = useMain();
  // #endregion
  // #region States
  // #endregion
  // #region Custom hooks
  // #endregion
  // #region Functions
  const handleOnCalendarTypeChange = useCallback(() => {
    setPickerType((prevType) => {
      const nextType = (prevType + 1) % (Object.keys(eCalendarPicker).length / 2);
      return nextType;
    });
  }, []);
  // #endregion
  // #region Effects
  // #endregion
  // #region Variables
  const customStyle = useMemo(() => styles(theme ?? defaultTheme), [theme]);
  // #endregion
  return (
    <TouchableOpacity style={customStyle.root} onPress={handleOnCalendarTypeChange}>
      <Text style={customStyle.label}>{format(currentDate, "MMMM, yyyy")}</Text>
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
      color: theme.onBackground,
    },
  });
