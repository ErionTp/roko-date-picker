import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import useMain from '../../features/hooks/useMain';
import { format } from 'date-fns';

type Props = {};
const Container: FC<Props> = ({}) => {
  // #region Members
  const { range, dateList, calendarType } = useMain();
  // #endregion
  // #region States
  // #endregion
  // #region Custom hooks
  // #endregion
  // #region Functions
  // #endregion
  // #region Effects
  // #endregion
  // #region Variables
  // #endregion
  return (
    <View style={styles.root}>
      <FlatList
        numColumns={7}
        data={dateList}
        renderItem={({ item, index }) => (
          <View>
            {item.map((date, dateIndex) => (
              <Text key={dateIndex}>{format(date, 'dd')}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default Container;

Container.displayName = 'Container';

const styles = StyleSheet.create({ root: {} });
