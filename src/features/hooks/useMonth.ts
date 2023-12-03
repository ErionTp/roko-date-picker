import { useContext } from "react";
import { MonthContext } from "../providers/month";

export default function useMonth() {
  const context = useContext(MonthContext);
  if (!context) throw new Error("The useMain function ought to be encapsulated within the scope of the MainProvider component.");
  return context;
}
