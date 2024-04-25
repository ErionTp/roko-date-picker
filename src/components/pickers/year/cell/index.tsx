import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, memo } from "react";
import { tTheme } from "../../../../features/domain/types/t.theme";
import format from "date-fns/format";
import { useStyles } from "../../../../features/hooks";
import SquareCellIndicator from "../../../indicators";
import CellContainer from "../../container";

type Props = {
  item: Date;
  index: number;
  theme?: tTheme;
  selected: boolean;
  onChange: (args: Date) => void;
};
const Cell: FC<Props> = ({ item, selected, theme, onChange, index }) => {
  // #region Variables
  const customStyle = useStyles(styles, theme);
  // #endregion
  return (
    <CellContainer index={index} activeOpacity={1} style={[customStyle.root]} onPress={() => onChange(item)}>
      <Text style={customStyle.label}>{format(item, "MMM")}</Text>
      <SquareCellIndicator visible={selected} />
    </CellContainer>
  );
};

export default memo(Cell);

Cell.displayName = "Cell";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    selected: {
      backgroundColor: theme.colors.primary,
    },
    label: { color: theme.colors.onBackground, fontFamily: theme.font?.family, textTransform: "capitalize" },
    selectedLabel: { color: theme.colors.onPrimary },
  });
