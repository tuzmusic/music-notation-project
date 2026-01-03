import type { StaffId } from "./Staff.ts";

export type Time = {
  num: number
  denom: 16 // todo: support other resolutions
}

export const MusicEventType = {
  SystemStart: 'systemStart',
  Clef: 'clef',
  Notehead: 'notehead'
} as const;

export type MusicEventType = typeof MusicEventType[keyof typeof MusicEventType];

export abstract class MusicEvent {
  public readonly id: string = crypto.randomUUID();
  abstract readonly musicEventType: MusicEventType;

  constructor(
    public readonly staffId: StaffId | null,
    public readonly startLocation: Time
  ) {
  }

  toEventListRow() {
    return {
      id: this.id,
      type: this.musicEventType,
      staffId: this.staffId,
      time: this.startLocation,
      details: this.getEventDetails()
    };
  }

  abstract getEventDetails(): string | null;
}
