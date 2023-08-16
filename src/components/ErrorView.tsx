import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Constants from '../utils/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {}
const ErrorView: FC<Props> = ({}) => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="alert-circle" size={24} />
        <Text style={{ fontSize: 18, marginStart: Constants.spacing.regular }}>Please provide valid dates to the calendar</Text>
      </View>
    </View>
  );
};

export default ErrorView;

const styles = StyleSheet.create({ root: { flex: 1, alignItems: 'center', justifyContent: 'center' }, container: { flexDirection: 'row' } });
