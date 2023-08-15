import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { IIconButtonProps } from '../../models/props/IIconButtonProps';

const IconButton: FC<IIconButtonProps> = ({ icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color={'red'} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({ root: {} });
