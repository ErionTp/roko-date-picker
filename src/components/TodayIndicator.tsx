import { StyleSheet, View } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import { isToday } from 'date-fns';
import { useMainContext } from '../hooks/MainContext';
import { ITheme } from '../models/ITheme';

interface Props {
  isSelected: boolean;
  item: Date;
}
const TodayIndicator: FC<Props> = ({ isSelected, item }) => {
  const { theme } = useMainContext();

  const themedStyle = useMemo(() => styles(theme), []);

  if (!isToday(item)) return null;
  return <View style={[themedStyle.root, isSelected && themedStyle.selectedBackground]} />;
};

export default memo(TodayIndicator);

const styles = (theme: ITheme) =>
  StyleSheet.create({
    root: { height: 3, width: 3, borderRadius: 3, backgroundColor: theme.onSecondary, position: 'absolute', bottom: 4 },
    selectedBackground: { backgroundColor: theme.background },
  });
