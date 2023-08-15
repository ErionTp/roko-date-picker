import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { IIconButton } from '../models/IIconButton';
import { useTheme } from '../hooks/ThemeContext';
import { IStyle } from '../models/props/IStyle';

const IconButton: FC<IIconButton> = ({ icon, onPress }) => {
  // #region HOOKS
  const context = useTheme();
  // #endregion
  // #region FUNCTIONS
  const style = () => {
    return styles(context.colors);
  };
  // #endregion
  return (
    <TouchableOpacity style={style().root} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color={context.colors.onBackground} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = (theme: IStyle) => StyleSheet.create({ root: { padding: 4, borderRadius: 16 } });
