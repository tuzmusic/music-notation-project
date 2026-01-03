import { Clef } from "../Clefs/Clef.ts";
import { MusicEvent, type StaffId, type Time } from "../Score.ts";

export class ClefEvent extends MusicEvent {
  readonly musicEventType = "ClefEvent";

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
