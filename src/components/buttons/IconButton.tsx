import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { IIconButtonProps } from '../../models/props/IIconButtonProps';
import { useTheme } from '../../hooks/ThemeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IconButton: FC<IIconButtonProps> = ({ icon, onPress }) => {
  // #region HOOKS
  const theme = useTheme();
  // #endregion
  // #region FUNCTIONS
  // #endregion
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color={theme.colors.onBackground} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({ root: {} });
