import { LayoutRectangle } from "react-native";
import { tRange } from "../types/t.range";
import { tTheme } from "../types/t.theme";
import materialColors from "./colors.material";

export const defaultRange: tRange = [new Date()];
export const defaultLayoutRectangle: LayoutRectangle = { x: 0, y: 0, height: 0, width: 0 };
export const defaultTheme: tTheme = {
  colors: {
    primary: materialColors.amber.default,
    onPrimary: materialColors.white.default,
    secondary: materialColors.white.default,
    onSecondary: materialColors.grey._400!,
    background: materialColors.grey._200!,
    onBackground: materialColors.blue_grey._800!,
  },
};
