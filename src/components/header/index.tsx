import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import Chevron from "../chevron";
import Label from "./label";
import defaults from "../../features/domain/constants/defaults";
import useMain from "../../features/hooks/useMain";
import materialColors from "../../features/domain/data/colors.material";

type Props = {};
const Header: FC<Props> = ({}) => {
  // #region Members
  const { onAdjustDate } = useMain();
  // #endregion
  return (
    <View style={styles.root}>
      <Chevron name="chevron-left" onPress={() => onAdjustDate(false)} />
      <Label />
      <Chevron name="chevron-right" onPress={() => onAdjustDate(true)} />
    </View>
  );
};

export default Header;

Header.displayName = "Header";

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    height: defaults.header.height,
  },
});
