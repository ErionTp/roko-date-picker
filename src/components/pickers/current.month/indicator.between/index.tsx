import { StyleSheet, View } from "react-native";
import React, { FC, memo, useMemo } from "react";
import materialColors from "../../../../features/domain/data/colors.material";
import { tWeekData } from "../../../../features/domain/types/t.data.week";
import sizes from "../../../../features/domain/constants/sizes";
import useMain from "../../../../features/hooks/useMain";
import { tTheme } from "../../../../features/domain/types/t.theme";
import { defaultTheme } from "../../../../features/domain/data/data.defaults";

type Props = { size: number } & Pick<tWeekData, "isBetween" | "firstSelection" | "secondSelection">;

const Indicator: FC<Props> = (props) => {
  // #region Members
  const { isBetween, firstSelection, secondSelection } = props;
  const { theme } = useMain();
  // #endregion
  // #region Variables
  const customStyles = useMemo(() => styles(props, theme ?? defaultTheme), [props, theme]);
  // #endregion
  return (
    <View
      style={[
        customStyles.root,
        isBetween && customStyles.isBetween,
        firstSelection && customStyles.isLeftEdge,
        secondSelection && customStyles.isRightEdge,
      ]}
    />
  );
};

export default memo(Indicator);

Indicator.displayName = "Indicator";

const styles = (props: Props, theme: tTheme) =>
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
