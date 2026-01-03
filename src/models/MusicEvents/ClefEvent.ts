import { Clef } from "../Clefs/Clef.ts";
import type { Staff } from "../Staff.ts";
import { MusicEvent, MusicEventType, type Time } from "../MusicEvent.ts";

export class ClefEvent extends MusicEvent {
  readonly musicEventType = MusicEventType.Clef;

  constructor(
    public readonly staff: Staff,
    public readonly startLocation: Time,
    public readonly clef: Clef
  ) {
    super(staff, startLocation);
  }

  getEventDetails(): string {
    return this.clef.name;
  }
}
