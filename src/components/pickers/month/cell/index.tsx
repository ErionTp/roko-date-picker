import { StyleSheet, Text, View } from "react-native";
import React, { FC, memo } from "react";
import format from "date-fns/format";
import { tTheme } from "../../../../features/domain/types/t.theme";
import TodayIndicator from "../indicators/indicator.today";
import { useStyles } from "../../../../features/hooks";
import CellContainer from "../../container";
import { sizes } from "../../../../features/domain/constants";

type Props = {
  item: Date;
  selected: boolean;
  sameMonth: boolean;
  theme?: tTheme;
  blocked: boolean;
  index: number;
  weekNumber: number;
  onChange: (args: Date) => void;
};
const BORDER_SIZE = 2;

const Cell: FC<Props> = ({
  item,
  selected,
  sameMonth,
  theme,
  blocked,
  index,
  weekNumber,
  onChange,
}) => {
  // #region functions
  const handleOnChange = () => onChange(item);
  // #endregion
  // #region variables

  const customStyles = useStyles(styles, theme);

  const calculatedPadding: Record<number, number> = {
    6: sizes.minuscule,
    5: sizes.petite,
    4: sizes.medium,
  };
  // #endregion
  return (
    <CellContainer
      index={index}
      activeOpacity={1}
      disabled={blocked}
      style={[customStyles.root, { padding: calculatedPadding[weekNumber] }]}
      onPress={handleOnChange}
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
    root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    selectedContainer: {
      elevation: 3,
      aspectRatio: 1,
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
