import { Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { format } from 'date-fns';

interface Props {
  title: string;
  range: [Date] | [Date, Date];
  onPress: () => void;
  mode: 'single' | 'range';
}
const Header: FC<Props> = ({ title, range, onPress, mode }) => {
  const text = {
    single: <Text>{format(range[0] ?? new Date(), 'MMM dd, yyyy')}</Text>,
    range: (
      <Text>
        {format(range[0], 'MMM dd, yyyy')} - {range[1] ? format(range[1], 'MMM dd, yyyy') : 'End date'}
      </Text>
    ),
  };
  return (
    <TouchableOpacity activeOpacity={1} style={{ gap: 6 }} onPress={onPress}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 4 }}>{text[mode]}</View>
    </TouchableOpacity>
  );
};

export default Header;
