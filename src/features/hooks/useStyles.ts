import { useMemo } from "react";
import { tTheme } from "../domain/types/t.theme";
import { StyleSheet } from "react-native";
import { defaultTheme } from "../domain/data/data.defaults";

const useStyles = (style: (theme: tTheme, ...args: any[]) => ReturnType<typeof StyleSheet.create>, theme: tTheme = defaultTheme, ...args: any[]) => {
  return useMemo(() => {
    return style(theme, ...args);
  }, [theme, style, ...args]);
};

export default useStyles;
