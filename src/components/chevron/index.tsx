import { StyleSheet, TouchableOpacity } from "react-native";
import React, { ComponentProps, FC } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { defaultTheme } from "../../features/domain/data/data.defaults";
import { tTheme } from "../../features/domain/types/t.theme";
import { defaults, sizes } from "../../features/domain/constants";
import { useMain, useStyles } from "../../features/hooks";

type Props = {
  name: ComponentProps<typeof MaterialCommunityIcons>["name"];
  onPress: () => void;
};
const Chevron: FC<Props> = ({ name, onPress }) => {
  // #region members
  const { theme } = useMain();
  // #endregion
  // #region variables
  const customStyle = useStyles(styles, theme);
  // #endregion
  return (
    <TouchableOpacity style={customStyle.root} onPress={onPress}>
      <MaterialCommunityIcons name={name} size={sizes.large} color={(theme ?? defaultTheme).colors.onBackground} />
    </TouchableOpacity>
  );
};

export default Chevron;

Chevron.displayName = "Chevron";

const styles = (theme: tTheme) =>
  StyleSheet.create({
    root: {
      alignItems: "center",
      justifyContent: "center",
      height: defaults.header.height,
      width: defaults.header.height,
    },
  });
