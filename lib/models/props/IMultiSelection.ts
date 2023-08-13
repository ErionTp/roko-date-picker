export interface IMultiSelection {
  multiple: true;
  value: { startDate: Date; endDate?: Date };
  onChange: (range: { startDate: Date; endDate?: Date }) => void;
}
