import { useContext } from "react";
import { Context } from "../../providers/main";

export function useMain() {
  const context = useContext(Context);
  if (!context) throw new Error("The useMain function ought to be encapsulated within the scope of the MainProvider component.");
  return context;
}
