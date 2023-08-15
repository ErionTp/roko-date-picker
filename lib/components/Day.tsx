import { Pressable, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import Cell from './Cell';
import { IStyle } from '../models/props/IStyle';
import { useTheme } from '../hooks/ThemeContext';

interface Props {
  day: Date;
  selected: boolean;
  isCurrentMonth: boolean;
  onChange: (value: Date) => void;
}
const Day: FC<Props> = ({ day, selected, onChange, isCurrentMonth }) => {
  // #region HOOKS
  const context = useTheme();
  // #endregion
  // #region FUNCTIONS
  const handleSelectDate = () => onChange(day);

  const style = () => {
    return styles(context.colors);
  };
  // #endregion
  return (
    <Pressable style={style().root} onPress={handleSelectDate}>
      <View style={style().container}>
        <View style={[style().dayContainer, selected && style().selectedBackground]}>
          <Cell {...{ day, selected, isCurrentMonth }} />
        </View>
      </View>
    </Pressable>
  );
};

export default Day;

const styles = (theme: IStyle) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    container: { ...StyleSheet.absoluteFillObject, alignItems: 'center' },
    dayContainer: { flex: 1, borderRadius: 100, aspectRatio: 1 },
    selectedBackground: {
      backgroundColor: theme.primary,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      borderWidth: 3,
      borderColor: theme.onPrimary,
    },
  });
