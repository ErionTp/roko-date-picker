import { tMain } from "./t.main";

export type tApp = Pick<
  tMain,
  | "mode"
  | "range"
  | "setRange"
  | "theme"
  | "blockedDates"
  | "minDate"
  | "maxDate"
  | "blockedWeekDay"
>;
