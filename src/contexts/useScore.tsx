import { useContext } from "react";

import { ScoreContext } from "./ScoreContext.tsx";

export function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}
