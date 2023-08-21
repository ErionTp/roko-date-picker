import { StyleSheet, View } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import { ITheme } from '../models/ITheme';
import { useMainContext } from '../hooks/MainContext';

interface Props {
  isBetween: boolean;
  firstSelection: boolean;
  secondSelection: boolean;
}

const BetweenDates: FC<Props> = ({ isBetween, firstSelection, secondSelection }) => {
  // #region HOOKS
  const context = useMainContext();
  // #endregion
  // #region FUNCTIONS
  const themedStyles = useMemo(() => styles(context.theme), []);
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
    isBetween: { backgroundColor: theme.secondary },
    isLeftEdge: { marginStart: 30 },
    isRightEdge: { marginEnd: 30 },
  });
