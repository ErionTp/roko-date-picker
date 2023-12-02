import { StyleSheet, View } from "react-native";
import React, { FC, memo, useMemo } from "react";
import { isToday } from "date-fns";
import { defaultTheme } from "../../../../features/domain/data/data.defaults";
import { tTheme } from "../../../../features/domain/types/t.theme";
import useMain from "../../../../features/hooks/useMain";

interface Props {
  selected: boolean;
  item: Date;
}
const TodayIndicator: FC<Props> = ({ selected, item }) => {
  const { theme } = useMain();

  const customStyles = useMemo(() => {
    const currentTheme: Partial<tTheme> = theme ?? defaultTheme;
    return styles(currentTheme);
  }, [theme]);

  if (!isToday(item)) return null;
  return <View style={[customStyles.root, selected && customStyles.selectedBackground]} />;
};

export default memo(TodayIndicator);

const styles = (theme: Partial<tTheme>) =>
  StyleSheet.create({
    root: { height: 3, width: 3, borderRadius: 3, backgroundColor: theme.onSecondary, position: "absolute", bottom: 4 },
    selectedBackground: { backgroundColor: theme.background },
  });
