import { createContext, useContext } from 'react';
import { Score, Staff, type Time } from '../models/Score';
import { TrebleClef } from '../models/Clefs/TrebleClef';
import { ClefEvent } from "../models/MusicEvents/ClefEvent.ts";

interface ScoreContextType {
    score: Score;
}

function makeInitialScore(): Score {
    const score = new Score();
    const staff = new Staff();
    const staffId = staff.id;
    const trebleClef = new TrebleClef();
    const startLocation: Time = { num: 0, denom: 16 };
    const clefEvent = new ClefEvent(staffId, startLocation, trebleClef);
    score.addEvent(clefEvent);

    score.addStaff(staff);
    return score;
}



const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: React.PropsWithChildren<{}>) {
    const score = makeInitialScore();

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
