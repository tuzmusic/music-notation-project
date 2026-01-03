import { ScoreContext } from "./ScoreContext.tsx";
import { useMemo } from "react";
import { makeInitialScore } from "./makeInitialScore.tsx";


export function ScoreProvider({ children }: React.PropsWithChildren) {
  const score = useMemo(() => makeInitialScore(), []);
  return (
    <ScoreContext value={{ score }}>
      {children}
    </ScoreContext>
  );
}

