import { Pressable, StyleSheet, View } from 'react-native';
import React, { FC, memo } from 'react';
import Styles from '../utils/Styles';
import Cell from './Cell';

interface Props {
  day: Date;
  selected: boolean;
  isCurrentMonth: boolean;
  onChange: (value: Date) => void;
}
const Day: FC<Props> = ({ day, selected, onChange, isCurrentMonth }) => {
  // #region FUNCTIONS
  const handleSelectDate = () => onChange(day);
  // #endregion
  return (
    <Pressable style={styles.root} onPress={handleSelectDate}>
      <View style={styles.container}>
        <View style={[styles.dayContainer, selected && styles.selectedBackground]}>
          <Cell {...{ day, selected, isCurrentMonth }} />
        </View>
      </View>
    </Pressable>
  );
};

export default Day;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: { ...StyleSheet.absoluteFillObject, alignItems: 'center' },
  dayContainer: { flex: 1, borderRadius: 1000, aspectRatio: 1 },
  selectedBackground: {
    backgroundColor: Styles.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderWidth: 3,
    borderColor: Styles.onPrimary,
  },
});
