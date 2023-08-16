export interface ISingleSelection {
  multiple?: false;
  value: Date;
  onChange: (value: Date) => void;
}
