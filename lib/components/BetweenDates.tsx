import { StyleSheet, View } from 'react-native';
import React, { FC, memo } from 'react';
import Styles from '../utils/Styles';

interface Props {
  isBetween: boolean;
  firstSelection: boolean;
  secondSelection: boolean;
}
const BetweenDates: FC<Props> = ({ isBetween, firstSelection, secondSelection }) => {
  return <View style={[styles.root, isBetween && styles.isBetween, firstSelection && styles.isLeftEdge, secondSelection && styles.isRightEdge]} />;
};

export default memo(BetweenDates);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    marginVertical: 0.5,
    zIndex: 0,
  },
  isBetween: { backgroundColor: Styles.primaryVariant },
  isLeftEdge: { marginStart: 30 },
  isRightEdge: { marginEnd: 30 },
});
