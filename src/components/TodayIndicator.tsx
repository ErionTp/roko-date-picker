import { StyleSheet, View } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import { isToday } from 'date-fns';
import useMain from '../features/hooks/useMain';
import { tTheme } from '../features/domain/types/t.Theme';
import defaultTheme from '../features/domain/data/default.theme';

interface Props {
  isSelected: boolean;
  item: Date;
}
const TodayIndicator: FC<Props> = ({ isSelected, item }) => {
  const { theme } = useMain();

  const customStyles = useMemo(() => {
    const currentTheme: Partial<tTheme> = theme ?? defaultTheme;
    return styles(currentTheme);
  }, [theme]);

  if (!isToday(item)) return null;
  return <View style={[customStyles.root, isSelected && customStyles.selectedBackground]} />;
};

export default memo(TodayIndicator);

const styles = (theme: Partial<tTheme>) =>
  StyleSheet.create({
    root: { height: 3, width: 3, borderRadius: 3, backgroundColor: theme.onSecondary, position: 'absolute', bottom: 4 },
    selectedBackground: { backgroundColor: theme.background },
  });
