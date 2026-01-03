import { Staff, type StaffId } from "./Staff.ts";
import { MusicEvent } from "./MusicEvent.ts";

export class Score {
  private staves = new Map<StaffId, Staff>()
  private events: MusicEvent[] = []

  public addStaff(staff: Staff) {
    this.staves.set(staff.id, staff);
  }

  public getStaves() {
    return Array.from(this.staves.values());
  }

  public addEvent(event: MusicEvent) {
    this.events.push(event);
  }

  public getEvents() {
    return this.events;
  }
}
