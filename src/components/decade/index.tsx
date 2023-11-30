import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { prepareYearsBasedOnDate } from '../../features/domain/utils/common';
import useMain from '../../features/hooks/useMain';
import { format } from 'date-fns';
import Constants from '../../utils/Constants';

type Props = {};
const DecadeView: FC<Props> = ({}) => {
  // #region Members
  const { currentDate, setCurrentDate, setCalendarType, calendarType } = useMain();
  const dateList = useMemo(() => prepareYearsBasedOnDate(currentDate), [currentDate]);
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
        data={dateList as Date[]}
        keyExtractor={(item) => item.toDateString()}
        numColumns={3}
        contentContainerStyle={{ height: '100%' }}
        columnWrapperStyle={{ height: '25%', flexGrow: 1 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              setCurrentDate(item);
              setCalendarType(calendarType - 1);
            }}
          >
            <Text style={styles.text}>{format(item, 'yyyy')}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DecadeView;

DecadeView.displayName = 'DecadeView';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  text: { fontSize: Constants.spacing.regular },
});
