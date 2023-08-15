export interface IWeekProps {
  week: Date[];
  value: Date[];
  currentDate: Date;
  onChange: (value: Date) => void;
}
