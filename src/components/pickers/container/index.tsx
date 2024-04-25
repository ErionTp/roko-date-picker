import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React, { PropsWithChildren } from "react";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";

type Props = TouchableOpacityProps & { index: number };

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

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
    <AnimatedTouchable {...rest} entering={FadeIn.delay(index * 3).duration(150)} style={styles.root}>
      {children}
    </AnimatedTouchable>
  );
};

export default CellContainer;

CellContainer.displayName = "CellContainer";

const styles = StyleSheet.create({ root: { flex: 1, justifyContent: "center", alignItems: "center", zIndex: 1 } });
