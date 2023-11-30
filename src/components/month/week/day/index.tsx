import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import { format } from 'date-fns';
import useMain from '../../../../features/hooks/useMain';
import { tTheme } from '../../../../features/domain/types/t.Theme';
import defaultTheme from '../../../../features/domain/data/default.theme';
import TodayIndicator from '../../../TodayIndicator';

type Props = {
  item: Date;
  selected: boolean;
  sameMonth: boolean;
  setCurrentDate: (args: Date) => void;
};
const DayView: FC<Props> = ({ item, selected, sameMonth, setCurrentDate }) => {
  // #region Members
  const { theme, cellSize } = useMain();
  // #endregion
  // #region Variables
  const customStyles = useMemo(() => {
    const currentTheme: Partial<tTheme> = theme ?? defaultTheme;
    return styles(currentTheme);
  }, [theme]);
  // #endregion
  // #region Actions
  if (!cellSize || cellSize === 0) return null;
  // #endregion
  return (
    <TouchableOpacity style={customStyles.root} activeOpacity={1} onPress={() => setCurrentDate(item)}>
      <View style={[customStyles.container, selected && customStyles.selectedContainer, { maxWidth: cellSize, maxHeight: cellSize }]}>
        <Text style={[customStyles.text, selected && customStyles.selectedText, !sameMonth && !selected && customStyles.differentMonth]}>
          {format(item, 'dd')}
        </Text>
        <TodayIndicator {...{ isSelected: selected, item }} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(DayView);

DayView.displayName = 'DayView';

const styles = (theme: Partial<tTheme>) =>
  StyleSheet.create({
    root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      aspectRatio: 1,
      flex: 1,
    },
    selectedContainer: {
      backgroundColor: theme.primary,
      shadowColor: '#000',
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      borderWidth: 3,
      borderColor: theme.onPrimary,
    },
    text: {
      color: theme.onBackground,
    },
    selectedText: {
      color: theme.onPrimary,
    },
    differentMonth: {
      color: theme.onSecondary,
    },
  });
