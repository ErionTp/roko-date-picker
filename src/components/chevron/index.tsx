import { StyleSheet, TouchableOpacity } from "react-native";
import React, { ComponentProps, FC, useMemo } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import defaults from "../../features/domain/constants/defaults";
import sizes from "../../features/domain/constants/sizes";
import useMain from "../../features/hooks/useMain";
import { defaultTheme } from "../../features/domain/data/data.defaults";
import { tTheme } from "../../features/domain/types/t.theme";
import useStyles from "../../features/hooks/useStyles";

type Props = {
  name: ComponentProps<typeof MaterialCommunityIcons>["name"];
  onPress: () => void;
};
const Chevron: FC<Props> = ({ name, onPress }) => {
  // #region Members
  const { theme } = useMain();
  // #endregion
  // #region Variables
  const customStyle = useStyles(styles, theme);
  // #endregion
  return (
    <TouchableOpacity style={customStyle.root} onPress={onPress}>
      <MaterialCommunityIcons name={name} size={sizes.large} color={(theme ?? defaultTheme).onBackground} />
    </TouchableOpacity>
  );
};

export default Chevron;

Chevron.displayName = "Chevron";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      width: defaults.header.height,
      alignItems: "center",
      justifyContent: "center",
    },
  });
