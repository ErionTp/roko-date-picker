import { StyleSheet, View } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import { useTheme } from '../hooks/ThemeContext';
import { IStyle } from '../models/props/IStyle';
import { ITheme } from '../models/ITheme';

interface Props {
  isBetween: boolean;
  firstSelection: boolean;
  secondSelection: boolean;
}

const BetweenDates: FC<Props> = ({ isBetween, firstSelection, secondSelection }) => {
  // #region HOOKS
  const theme = useTheme();
  // #endregion
  // #region FUNCTIONS
  const themedStyles = useMemo(() => styles(theme), [theme]);
  // #endregion

  return (
    <View
      style={[
        themedStyles.root,
        isBetween && themedStyles.isBetween,
        firstSelection && themedStyles.isLeftEdge,
        secondSelection && themedStyles.isRightEdge,
      ]}
    />
  );
};

export default memo(BetweenDates);

const styles = (theme: ITheme) =>
  StyleSheet.create({
    root: {
      ...StyleSheet.absoluteFillObject,
      marginVertical: 1,
    },
    isBetween: { backgroundColor: theme.colors.primaryVariant },
    isLeftEdge: { marginStart: 30 },
    isRightEdge: { marginEnd: 30 },
  });
