import { StyleSheet, View } from 'react-native';
import React, { FC, memo } from 'react';
import { useTheme } from '../hooks/ThemeContext';
import { ITheme } from '../models/props/ITheme';

interface Props {
  isBetween: boolean;
  firstSelection: boolean;
  secondSelection: boolean;
}
const BetweenDates: FC<Props> = ({ isBetween, firstSelection, secondSelection }) => {
  const theme = useTheme();

  const style = () => {
    return styles(theme);
  };
  return (
    <View style={[style().root, isBetween && style().isBetween, firstSelection && style().isLeftEdge, secondSelection && style().isRightEdge]} />
  );
};

export default memo(BetweenDates);

const styles = (theme: ITheme) =>
  StyleSheet.create({
    root: {
      ...StyleSheet.absoluteFillObject,
      marginVertical: 0.5,
      zIndex: 0,
    },
    isBetween: { backgroundColor: theme.primaryVariant },
    isLeftEdge: { marginStart: 30 },
    isRightEdge: { marginEnd: 30 },
  });
