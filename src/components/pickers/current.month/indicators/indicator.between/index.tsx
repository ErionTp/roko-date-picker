import { StyleSheet, View } from "react-native";
import React, { FC, memo } from "react";
import { tWeekData } from "../../../../../features/domain/types/t.data.week";
import sizes from "../../../../../features/domain/constants/sizes";
import useMain from "../../../../../features/hooks/useMain";
import { tTheme } from "../../../../../features/domain/types/t.theme";
import useStyles from "../../../../../features/hooks/useStyles";

type Props = { size: number } & Pick<tWeekData, "isBetween" | "firstSelection" | "secondSelection">;

const BetweenIndicator: FC<Props> = (props) => {
  // #region Members
  const { isBetween, firstSelection, secondSelection } = props;
  const { theme } = useMain();
  // #endregion
  // #region Variables
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
    isBetween: { backgroundColor: theme.secondary },
    isLeftEdge: { marginLeft: "50%" },
    isRightEdge: { marginRight: "50%" },
  });
