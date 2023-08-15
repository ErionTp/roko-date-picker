import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import IconButton from './IconButton';
import Constants from '../utils/Constants';
import { useTheme } from '../hooks/ThemeContext';
import { IStyle } from '../models/props/IStyle';

interface Props {
  handlePreviousMonth: () => void;
  handleNextMonth: () => void;
  title: string;
}

const CalendarHeader: FC<Props> = ({ title, handlePreviousMonth, handleNextMonth }) => {
  const context = useTheme();

  const style = () => {
    return styles(context.colors);
  };

  return (
    <View style={style().root}>
      <IconButton icon="chevron-left" onPress={handlePreviousMonth} />
      <Text style={style().title}>{title}</Text>
      <IconButton icon="chevron-right" onPress={handleNextMonth} />
    </View>
  );
};

export default CalendarHeader;

const styles = (theme: IStyle) =>
  StyleSheet.create({
    root: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Constants.spacing.medium,
    },
    title: { fontSize: Constants.spacing.regular, color: theme.onBackground },
  });
