import { createContext, useContext } from 'react';
import { Score } from '../models/Score';

interface ScoreContextType {
  score: Score;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: React.PropsWithChildren<{}>) {
  const score = new Score();

  return (
    <ScoreContext.Provider value={{ score }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}
