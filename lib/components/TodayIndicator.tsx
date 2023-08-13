import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { isToday } from 'date-fns';
import { useTheme } from '../hooks/ThemeContext';
import { ITheme } from '../models/props/ITheme';

interface Props {
  value: Date;
  selected: boolean;
}
const TodayIndicator: FC<Props> = ({ value, selected }) => {
  // #region HOOKS
  const theme = useTheme();
  // #endregion
  // #region FUNCTIONS
  const style = () => {
    return styles(theme);
  };
  // #endregion

  if (isToday(value)) {
    return <View style={[style().root, { backgroundColor: selected ? theme.primaryVariant : theme.onPrimaryVariant }]} />;
  } else {
    return null;
  }
};

export default TodayIndicator;

const styles = (theme: ITheme) =>
  StyleSheet.create({ root: { height: 5, width: 5, borderRadius: 5, position: 'absolute', backgroundColor: 'white', bottom: 5 } });
