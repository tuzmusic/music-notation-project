import { Staff } from "./Staff.ts";

export type Time = {
  num: number
  denom: 16 // todo: support other resolutions
}

export type StaffId = string // symbol?

export abstract class MusicEvent {
  public readonly id: string = crypto.randomUUID();
  abstract readonly musicEventType: string;
  constructor(
    public readonly staffId: StaffId,
    public readonly startLocation: Time
  ) { }

  toEventListRow() {
    return {
      id: this.id,
      type: this.musicEventType,
      staffId: this.staffId,
      time: this.startLocation,
      details: this.getEventDetails(),
    };
  }

  abstract getEventDetails(): string;
}

export class Score {
  private staves: Staff[] = []
  private events: MusicEvent[] = []

  public addStaff(staff: Staff) {
    this.staves.push(staff);
  }

  public getStaves() {
    return this.staves;
  }

  public addEvent(event: MusicEvent) {
    this.events.push(event);
  }

  public getEvents() {
    return this.events;
  }
}
