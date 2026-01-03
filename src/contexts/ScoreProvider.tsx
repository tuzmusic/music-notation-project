import { Score, type Time } from '../models/Score';
import { TrebleClef } from '../models/Clefs/TrebleClef';
import { ClefEvent } from "../models/MusicEvents/ClefEvent.ts";
import { Staff } from "../models/Staff.ts";
import { ScoreContext as ScoreContext1 } from "./ScoreContext.tsx";

function makeInitialScore(): Score {
    const score = new Score();
    const staff = new Staff();
    const staffId = staff.id;
    const trebleClef = new TrebleClef();
    const startLocation: Time = { num: 1, denom: 16 };
    const clefEvent = new ClefEvent(staffId, startLocation, trebleClef);
    score.addEvent(clefEvent);

    score.addStaff(staff);
    return score;
}



export function ScoreProvider({ children }: React.PropsWithChildren<{}>) {
    const score = makeInitialScore();

    return (
        <ScoreContext1 value={{ score }}>
            {children}
        </ScoreContext1>
    );
}

