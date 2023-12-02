import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, memo } from "react";
import format from "date-fns/format";
import sizes from "../../../../features/domain/constants/sizes";
import { tTheme } from "../../../../features/domain/types/t.theme";
import TodayIndicator from "../indicators/indicator.today";
import useStyles from "../../../../features/hooks/useStyles";

type Props = {
  item: Date;
  onChange: (args: Date) => void;
  selected: boolean;
  sameMonth: boolean;
  width: number;
  height: number;
  theme?: tTheme;
};
const BORDER_SIZE = 3;

const Day: FC<Props> = ({ item, onChange, selected, sameMonth, width, height, theme }) => {
  // #region States
  const size = width > height ? height : width;
  console.log(selected);
  // #endregion
  // #region Variables
  const customStyles = useStyles(styles, theme, size);
  // #endregion
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onChange(item)} style={customStyles.root}>
      <View style={[customStyles.container, selected && customStyles.selectedContainer]}>
        <Text
          numberOfLines={1}
          allowFontScaling={true}
          style={[customStyles.text, selected && customStyles.selectedText, !sameMonth && !selected && customStyles.differentMonth]}
        >
          {format(item, "dd")}
        </Text>
        <TodayIndicator {...{ selected, item }} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(Day);

Day.displayName = "Day";

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
      backgroundColor: theme.primary,
      shadowColor: "#000",
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      borderWidth: BORDER_SIZE,
      borderColor: theme.onPrimary,
      borderRadius: currentSize / 2,
    },
    text: {
      color: theme.onBackground,
    },
    selectedText: {
      color: theme.onPrimary,
    },
    differentMonth: {
      color: theme.onSecondary,
    },
  });
