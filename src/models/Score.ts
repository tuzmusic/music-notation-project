import { Staff } from "./Staff.ts";
import { MusicEvent } from "./MusicEvent.ts";

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
