import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React, { PropsWithChildren } from "react";

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
    <TouchableOpacity {...rest} style={styles.root}>
      {children}
    </TouchableOpacity>
  );
};

export default CellContainer;

CellContainer.displayName = "CellContainer";

const styles = StyleSheet.create({ root: { flex: 1, justifyContent: "center", alignItems: "center", zIndex: 1 } });
