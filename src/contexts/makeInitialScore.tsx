import { Score, type Time } from "../models/Score.ts";
import { Staff } from "../models/Staff.ts";
import { TrebleClef } from "../models/Clefs/TrebleClef.ts";
import { ClefEvent } from "../models/MusicEvents/ClefEvent.ts";

export function makeInitialScore(): Score {
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
