import { Children, type ReactNode } from "react";

// Define the props that the Each component will accept
interface Props<T> {
  render: (item: T, index: number) => ReactNode;
  of: T[];
}

// Use generic type T to allow flexibility on the type of items in the of array
const Each = <T,>({ render, of }: Props<T>): ReactNode => {
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export default Each;
