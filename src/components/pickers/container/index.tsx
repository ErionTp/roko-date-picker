import { Pressable, StyleSheet, TouchableOpacityProps } from "react-native";
import React, { PropsWithChildren } from "react";
import { sizes } from "../../../features/domain/constants";

type Props = TouchableOpacityProps & { index: number };

const CellContainer: React.FC<PropsWithChildren<Props>> = ({ index, children, ...rest }) => {
  // #region members
  // #endregion
  // #region states
  // #endregion
  // #region custom hooks
  // #endregion
  // #region functions
  // #endregion
  // #region effects
  // #endregion
  // #region variables
  // #endregion
  return (
    <Pressable {...rest} style={[rest.style, styles.root]}>
      {children}
    </Pressable>
  );
};

export default CellContainer;

CellContainer.displayName = "CellContainer";

const styles = StyleSheet.create({
  root: { zIndex: 1 },
});
