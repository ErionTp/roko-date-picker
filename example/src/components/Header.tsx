import { Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { format } from 'date-fns';

interface Props {
  title: string;
  value: any;
  onPress: () => void;
}
const Header: FC<Props> = ({ title, value, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={1} style={{ gap: 6 }} onPress={onPress}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        <Text>{format(value.startDate ?? value, 'MMM dd, yyyy')}</Text>
        <>
          <Text> - </Text>
          <Text>{value.endDate ? format(value.endDate, 'MMM dd, yyyy') : 'End date'}</Text>
        </>
      </View>
    </TouchableOpacity>
  );
};

export default Header;
