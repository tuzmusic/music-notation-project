type Time = {
  num: number
  denom: 16 // todo: support other resolutions
}

type StaffId = string // symbol?
const Clefs = {
  'treble': {
    name: 'treble',
    // bottom line = 0, lowest space = 1
    fromBottom: 2
  }
} as const

class TrebleClef extends Clef {

}

class Clef {
  public readonly name: string
  // bottom line = 0, lowest space = 1
  public readonly fromBottom: number
}

type ClefName = keyof typeof Clefs

class ClefEvent extends MusicEvent {
  private event: Clef
}

class MusicEvent {
  private staffId: StaffId
  private startLocation: Time
}

class Staff {
  private events: MusicEvent[]
  private id:  StaffId // symbol?
}

export class Score {
  private staves: Staff[]
}
