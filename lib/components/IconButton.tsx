import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from '../utils/Styles';
import { IIconButton } from '../models/IIconButton';

const IconButton: FC<IIconButton> = ({ icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color={Styles.onBackground} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({ root: { padding: 4, borderRadius: 16 } });
