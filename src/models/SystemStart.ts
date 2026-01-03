import { MusicEvent, MusicEventType } from "./Score";


export class SystemStart extends MusicEvent {
  readonly musicEventType = MusicEventType.SystemStart;

  getEventDetails() {
    return null;
  }
}
