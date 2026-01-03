import type { Staff, StaffId } from "./Staff.ts";

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
  public readonly staffId: StaffId | null;
  abstract readonly musicEventType: MusicEventType;

  constructor(
    staff: Staff | null,
    public readonly startLocation: Time
  ) {
    this.staffId = staff?.id ?? null;
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

export abstract class DurationEvent extends MusicEvent {
  constructor(
    staff: Staff | null,
    public readonly startLocation: Time,
    public readonly endLocation: Time
  ) {
    super(staff, startLocation)
  }
}
