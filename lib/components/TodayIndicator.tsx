import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { isToday } from 'date-fns';
import { useTheme } from '../hooks/ThemeContext';
import { IStyle } from '../models/props/IStyle';

interface Props {
  value: Date;
  selected: boolean;
}
const TodayIndicator: FC<Props> = ({ value, selected }) => {
  // #region HOOKS
  const context = useTheme();
  // #endregion
  // #region FUNCTIONS
  const style = () => {
    return styles(context.colors);
  };
  // #endregion

  if (isToday(value)) {
    return <View style={[style().root, { backgroundColor: selected ? context.colors.primaryVariant : context.colors.onPrimaryVariant }]} />;
  } else {
    return null;
  }
};

export default TodayIndicator;

const styles = (theme: IStyle) =>
  StyleSheet.create({ root: { height: 5, width: 5, borderRadius: 5, position: 'absolute', backgroundColor: 'white', bottom: 5 } });
