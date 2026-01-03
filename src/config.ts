import { MusicEventType } from "./models/Score.ts";

export const config = {
  page: {
    topMargin: 40
  },
  staff: {
    baseLineSize: 1,
    baseSpaceSize: 10,
    lines: 5
  },
  barline: {
    baseThickness: 2.5
  }
} as const


export const unknownSpacing = 2
export const spacing: Partial<
  Record<MusicEventType,
  { to: Partial<Record<MusicEventType, number>> }
>>
  = {
  [MusicEventType.SystemStart]: {
    to: {
      [MusicEventType.Clef]: 6
    }
  },
  [MusicEventType.Clef]: {
    to: {
      [MusicEventType.Notehead]: 4
    }
  },
  [MusicEventType.Notehead]: {
    to: {
      [MusicEventType.Notehead]: 2
    }
  }
}
