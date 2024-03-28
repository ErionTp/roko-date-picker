import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC, memo } from "react";
import { tTheme } from "../../../../features/domain/types/t.theme";
import format from "date-fns/format";
import { useStyles } from "../../../../features/hooks";

type Props = {
  item: Date;
  selected: boolean;
  theme?: tTheme;
  onChange: (args: Date) => void;
};
const Cell: FC<Props> = ({ item, selected, theme, onChange }) => {
  // #region Variables
  const customStyle = useStyles(styles, theme);
  // #endregion
  return (
    <TouchableOpacity activeOpacity={1} style={[customStyle.root, selected && customStyle.selected]} onPress={() => onChange(item)}>
      <Text style={[customStyle.label, selected && customStyle.selectedLabel]}>{format(item, "yyyy")}</Text>
    </TouchableOpacity>
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
