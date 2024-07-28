import { StyleSheet, Text, View } from "react-native";
import React, { FC, memo } from "react";
import format from "date-fns/format";
import { tTheme } from "../../../../features/domain/types/t.theme";
import TodayIndicator from "../indicators/indicator.today";
import { sizes } from "../../../../features/domain/constants";
import { useStyles } from "../../../../features/hooks";
import CellContainer from "../../container";

type Props = {
  item: Date;
  onChange: (args: Date) => void;
  selected: boolean;
  sameMonth: boolean;
  theme?: tTheme;
  blocked: boolean;
  index: number;
};
const BORDER_SIZE = 2;

const Cell: FC<Props> = ({ item, onChange, selected, sameMonth, theme, blocked, index }) => {
  // #region Variables
  const customStyles = useStyles(styles, theme);
  // #endregion
  return (
    <CellContainer
      disabled={blocked}
      activeOpacity={1}
      onPress={() => onChange(item)}
      index={index}
    >
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
    </CellContainer>
  );
};

export default memo(Cell);

Cell.displayName = "Cell";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {},
    container: {
      flex: 1,
      aspectRatio: 1,
      margin: sizes.petite,
      alignItems: "center",
      justifyContent: "center",
    },
    selectedContainer: {
      elevation: 3,
      shadowRadius: 2.22,
      shadowOpacity: 0.22,
      borderWidth: BORDER_SIZE,
      borderRadius: 50,
      borderColor: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
      shadowColor: "#000",
      shadowOffset: {
        width: -2,
        height: 2,
      },
    },
    text: {
      textTransform: "capitalize",
      fontFamily: theme.font?.family,
      color: theme.colors.onBackground,
    },
    selectedText: {
      color: theme.colors.onPrimary,
    },
    differentMonth: {
      color: theme.colors.onSecondary,
    },
    blocked: {
      color: theme.colors.disabled,
    },
  });
