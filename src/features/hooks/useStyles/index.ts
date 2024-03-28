import { useMemo } from "react";
import { type StyleSheet } from "react-native";
import { tTheme } from "../../domain/types/t.theme";
import { defaultTheme } from "../../domain/data/data.defaults";

// Define a type for the styles function that now includes a generic type for the rest parameters
type StylesFunction<T, Args extends unknown[]> = (theme: tTheme, ...args: Args) => T;

export const useStyles = <T extends StyleSheet.NamedStyles<T>, Args extends unknown[] = []>(
  styleFn: StylesFunction<T, Args>,
  theme?: tTheme,
  ...args: Args
): T => {
  // Use useMemo to memoize the styles. Note: We need to use JSON.stringify for the args to ensure useMemo can compare them correctly
  return useMemo(() => styleFn(theme ?? defaultTheme, ...args), [args, styleFn, theme]);
};
