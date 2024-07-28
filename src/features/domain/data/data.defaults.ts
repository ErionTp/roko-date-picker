import { tRange } from "../types/t.range";
import { tTheme } from "../types/t.theme";
import materialColors from "./colors.material";
import { tLayoutRectangle } from "../types/t.layout.rectangle";

export const defaultRange: tRange = [new Date()];
export const defaultLayoutRectangle: tLayoutRectangle = { height: 0, width: 0 };
export const defaultTheme: tTheme = {
  colors: {
    primary: materialColors.amber.default,
    onPrimary: materialColors.white.default,
    secondary: materialColors.white.default,
    onSecondary: materialColors.grey._400!,
    background: materialColors.grey._200!,
    onBackground: materialColors.blue_grey._800!,
    disabled: materialColors.red._200!,
  },
  font: {},
};
