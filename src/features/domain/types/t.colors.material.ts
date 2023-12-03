export type tMaterialColorFamily = {
  default: string;
  _50?: string;
  _100?: string;
  _200?: string;
  _300?: string;
  _400?: string;
  _500?: string;
  _600?: string;
  _700?: string;
  _800?: string;
  _900?: string;
  a100?: string;
  a200?: string;
  a400?: string;
  a700?: string;
};

type family =
  | 'red'
  | 'pink'
  | 'purple'
  | 'deep_purple'
  | 'indigo'
  | 'blue'
  | 'light_blue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'light_green'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'deep_orange'
  | 'brown'
  | 'grey'
  | 'blue_grey'
  | 'white'
  | 'black';

export type tMaterialColors = Record<family, tMaterialColorFamily>;
