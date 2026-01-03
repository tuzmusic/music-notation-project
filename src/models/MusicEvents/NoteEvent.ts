import { DurationEvent, MusicEventType, type Time } from "../MusicEvent.ts";
import type { Staff } from "../Staff.ts";

export type Pitch = number | string

export class NoteEvent extends DurationEvent {
  public readonly musicEventType = MusicEventType.Notehead;

  public getEventDetails(): string | null {
    return `${this.pitch}`
  }

  constructor(
    staff: Staff | null,
    public readonly startLocation: Time,
    public readonly endLocation: Time,
    private pitch: Pitch
  ) {
    super(staff, startLocation, endLocation)
  }


}
