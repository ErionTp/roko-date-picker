import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import Chevron from "../chevron";
import Label from "./label";
import defaults from "../../features/domain/constants/defaults";

type Props = {};
const Header: FC<Props> = ({}) => {
  // #region Members
  // #endregion
  // #region Functions
  // #endregion
  return (
    <View style={styles.root}>
      <Chevron name="chevron-left" onPress={() => {}} />
      <Label />
      <Chevron name="chevron-right" onPress={() => {}} />
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
