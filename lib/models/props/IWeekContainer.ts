export interface IWeekContainer {
  week: Date[];
  value: Date[];
  currentDate: Date;
  onChange: (value: Date) => void;
}
