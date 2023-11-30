import { StyleSheet, View } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import useMain from '../../../../features/hooks/useMain';
import { tTheme } from '../../../../features/domain/types/t.Theme';
import defaultTheme from '../../../../features/domain/data/default.theme';

interface Props {
  isBetween: boolean;
  firstSelection: boolean;
  secondSelection: boolean;
}

const BetweenDates: FC<Props> = ({ isBetween, firstSelection, secondSelection }) => {
  // #region Hooks
  const { theme, cellSize } = useMain();
  // #endregion
  // #region Variables
  const customStyles = useMemo(() => {
    const currentTheme: Partial<tTheme> = theme ?? defaultTheme;
    return styles(currentTheme, cellSize);
  }, [theme, cellSize]);
  // #endregion
  return (
    <View
      style={[
        customStyles.root,
        isBetween && customStyles.isBetween,
        firstSelection && customStyles.isLeftEdge,
        secondSelection && customStyles.isRightEdge,
      ]}
    />
  );
};

export default memo(BetweenDates);

const styles = (theme: Partial<tTheme>, cellSize?: number) =>
  StyleSheet.create({
    root: {
      ...StyleSheet.absoluteFillObject,
      marginVertical: 1,
    },
    isBetween: { backgroundColor: theme.secondary },
    isLeftEdge: { marginLeft: (cellSize ?? 50) / 2 },
    isRightEdge: { marginRight: (cellSize ?? 50) / 2 },
  });
