import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { IIconButton } from '../models/IIconButton';
import { useTheme } from '../hooks/ThemeContext';
import { ITheme } from '../models/props/ITheme';

const IconButton: FC<IIconButton> = ({ icon, onPress }) => {
  // #region HOOKS
  const theme = useTheme();
  // #endregion
  // #region FUNCTIONS
  const style = () => {
    return styles(theme);
  };
  // #endregion
  return (
    <TouchableOpacity style={style().root} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color={theme.onBackground} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = (theme: ITheme) => StyleSheet.create({ root: { padding: 4, borderRadius: 16 } });
