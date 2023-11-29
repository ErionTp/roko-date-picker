import { useContext } from 'react';
import { MainContext } from '../providers/main';

export default function useMain() {
  const context = useContext(MainContext);
  if (!context) throw new Error('Use main should be used within a MainContextProvider');
  return context;
}
