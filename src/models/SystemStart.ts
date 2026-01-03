
import { MusicEvent, MusicEventType } from "./MusicEvent.ts";


export class SystemStart extends MusicEvent {
  readonly musicEventType = MusicEventType.SystemStart;

  getEventDetails() {
    return null;
  }
}
