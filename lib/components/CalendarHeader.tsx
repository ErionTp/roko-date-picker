import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import IconButton from './IconButton';
import Styles from '../utils/Styles';
import Constants from '../utils/Constants';

interface Props {
  handlePreviousMonth: () => void;
  handleNextMonth: () => void;
  title: string;
}

const CalendarHeader: FC<Props> = ({ title, handlePreviousMonth, handleNextMonth }) => {
  return (
    <View style={styles.root}>
      <IconButton icon="chevron-left" onPress={handlePreviousMonth} />
      <Text style={styles.title}>{title}</Text>
      <IconButton icon="chevron-right" onPress={handleNextMonth} />
    </View>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Constants.spacing.medium,
  },
  title: { fontSize: Constants.spacing.regular, color: Styles.onBackground },
});
