import { StyleSheet, View } from "react-native";
import React, { FC, memo } from "react";
import { tWeekData } from "../../../../../features/domain/types/t.data.week";
import { tTheme } from "../../../../../features/domain/types/t.theme";
import { sizes } from "../../../../../features/domain/constants";
import { useMain, useStyles } from "../../../../../features/hooks";

type Props = { size: number } & Pick<tWeekData, "isBetween" | "firstSelection" | "secondSelection">;

const BetweenIndicator: FC<Props> = (props) => {
  // #region members
  const { isBetween, firstSelection, secondSelection } = props;
  const { theme } = useMain();
  // #endregion
  // #region variables
  const customStyle = useStyles(styles, theme);
  // #endregion
  return (
    <View
      style={[
        customStyle.root,
        isBetween && customStyle.isBetween,
        firstSelection && customStyle.isLeftEdge,
        secondSelection && customStyle.isRightEdge,
      ]}
    />
  );
};

export default memo(BetweenIndicator);

BetweenIndicator.displayName = "BetweenIndicator";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 0,
      marginVertical: sizes.microscopic / 2,
    },
    isBetween: { backgroundColor: theme.colors.secondary },
    isLeftEdge: { marginLeft: "50%" },
    isRightEdge: { marginRight: "50%" },
  });
