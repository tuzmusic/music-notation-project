import { Clef } from "../Clefs/Clef.ts";
import type { StaffId } from "../Staff.ts";
import { MusicEvent, MusicEventType, type Time } from "../MusicEvent.ts";

export class ClefEvent extends MusicEvent {
  readonly musicEventType = MusicEventType.Clef;

  constructor(
    staffId: StaffId,
    startLocation: Time,
    public readonly clef: Clef
  ) {
    super(staffId, startLocation);
  }

  getEventDetails(): string {
    return this.clef.name;
  }
}
