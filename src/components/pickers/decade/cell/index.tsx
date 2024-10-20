import { StyleSheet, Text, View } from "react-native";
import React, { FC, memo } from "react";
import { tTheme } from "../../../../features/domain/types/t.theme";
import format from "date-fns/format";
import { useStyles } from "../../../../features/hooks";
import CellContainer from "../../container";
import { sizes } from "../../../../features/domain/constants";

type Props = {
  item: Date;
  selected: boolean;
  theme?: tTheme;
  onChange: (args: Date) => void;
  index: number;
};
const Cell: FC<Props> = ({ item, selected, theme, onChange, index }) => {
  // #region Variables
  const customStyle = useStyles(styles, theme);
  // #endregion
  return (
    <CellContainer
      activeOpacity={1}
      style={customStyle.root}
      onPress={() => onChange(item)}
      index={index}
    >
      <View
        style={{
          borderBottomWidth: 6,
          borderRadius: sizes.tiny,
          borderCurve: "continuous",
          borderBottomColor: selected ? theme?.colors.primary : "transparent",
        }}
      >
        <Text style={customStyle.label}>{format(item, "yyyy")}</Text>
      </View>
    </CellContainer>
  );
};

export default memo(Cell);

Cell.displayName = "Cell";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      height: "25%",
      minWidth: "33.3333%",
      alignItems: "center",
      justifyContent: "center",
    },
    selected: {
      backgroundColor: theme.colors.primary,
    },
    label: {
      color: theme.colors.onBackground,
      fontFamily: theme.font?.family,
      textTransform: "capitalize",
    },
    selectedLabel: { color: theme.colors.onPrimary },
  });
