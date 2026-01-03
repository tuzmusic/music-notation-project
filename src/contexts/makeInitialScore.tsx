import { Score } from "../models/Score.ts";
import { Staff } from "../models/Staff.ts";
import { TrebleClef } from "../models/Clefs/TrebleClef.ts";
import { ClefEvent } from "../models/MusicEvents/ClefEvent.ts";
import type { Time } from "../models/MusicEvent.ts";
import { NoteEvent } from "../models/MusicEvents/NoteEvent.ts";

export function makeInitialScore(): Score {
  const score = new Score();
  const staff = new Staff();
  score.addStaff(staff);

  const trebleClef = new TrebleClef();
  const startLocation: Time = { num: 1, denom: 16 };
  const clefEvent = new ClefEvent(staff, startLocation, trebleClef);
  score.addEvent(clefEvent);

  const note = new NoteEvent(staff, startLocation, { num: 5, denom: 16 }, 'G4')
  score.addEvent(note)

  return score;
}
