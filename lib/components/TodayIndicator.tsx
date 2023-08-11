import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { isToday } from 'date-fns';
import Styles from '../utils/Styles';

interface Props {
  value: Date;
  selected: boolean;
}
const TodayIndicator: FC<Props> = ({ value, selected }) => {
  if (isToday(value)) {
    return <View style={[styles.root, { backgroundColor: selected ? Styles.primaryVariant : Styles.onPrimaryVariant }]} />;
  } else {
    return null;
  }
};

export default TodayIndicator;

const styles = StyleSheet.create({ root: { height: 5, width: 5, borderRadius: 5, position: 'absolute', backgroundColor: 'white', bottom: 5 } });
