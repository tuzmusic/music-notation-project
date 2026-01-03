import { createContext } from "react";
import { Score } from "../models/Score.ts";

export interface ScoreContextType {
  score: Score;
}

export const ScoreContext = createContext<ScoreContextType | undefined>(undefined);
