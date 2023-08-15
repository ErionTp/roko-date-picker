import { ISpaces } from './props/ISpaces';
import { IStyle } from './props/IStyle';

export interface ITheme {
  colors: IStyle;
  spacing?: ISpaces;
}
