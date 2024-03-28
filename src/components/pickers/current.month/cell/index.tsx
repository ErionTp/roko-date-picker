import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, memo, useEffect } from "react";
import format from "date-fns/format";
import { tTheme } from "../../../../features/domain/types/t.theme";
import TodayIndicator from "../indicators/indicator.today";
import { sizes } from "../../../../features/domain/constants";
import { useStyles } from "../../../../features/hooks";
import { useSharedValue } from "react-native-reanimated";

type Props = {
  item: Date;
  onChange: (args: Date) => void;
  selected: boolean;
  sameMonth: boolean;
  width: number;
  height: number;
  theme?: tTheme;
  blocked: boolean;
};
const BORDER_SIZE = 2;

const Cell: FC<Props> = ({ item, onChange, selected, sameMonth, width, height, theme, blocked }) => {
  // #region members
  const size = width > height ? height : width;
  // #endregion
  // #region Variables
  const customStyles = useStyles(styles, theme, size);
  // #endregion
  return (
    <TouchableOpacity disabled={blocked} activeOpacity={1} onPress={() => onChange(item)} style={customStyles.root}>
      <View style={[customStyles.container, selected && customStyles.selectedContainer]}>
        <Text
          numberOfLines={1}
          allowFontScaling={true}
          style={[
            customStyles.text,
            selected && customStyles.selectedText,
            !sameMonth && !selected && customStyles.differentMonth,
            blocked && customStyles.blocked,
          ]}
        >
          {format(item, "dd")}
        </Text>
        <TodayIndicator {...{ selected, item }} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(Cell);

Cell.displayName = "Cell";

const styles = (theme: tTheme, currentSize: number) =>
  StyleSheet.create({
    root: { flex: 1, justifyContent: "center", alignItems: "center", zIndex: 1 },
    container: {
      justifyContent: "center",
      alignItems: "center",
      width: currentSize - sizes.petite,
      height: currentSize - sizes.petite,
    },
    selectedContainer: {
      backgroundColor: theme.colors.primary,
      shadowColor: "#000",
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      borderWidth: BORDER_SIZE,
      borderColor: theme.colors.onPrimary,
      borderRadius: currentSize / 2,
    },
    text: {
      color: theme.colors.onBackground,
      fontFamily: theme.font?.family,
      textTransform: "capitalize",
    },
    selectedText: {
      color: theme.colors.onPrimary,
    },
    differentMonth: {
      color: theme.colors.onSecondary,
    },
    blocked: {
      color: `${theme.colors.onBackground}90`,
    },
  });
function interpolate(value: any, arg1: number[], arg2: number[]) {
  throw new Error("Function not implemented.");
}
