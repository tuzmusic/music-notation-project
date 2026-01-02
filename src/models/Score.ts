type Time = {
  num: number
  denom: 16 // todo: support other resolutions
}

type StaffId = string // symbol?

class TrebleClef extends Clef {
  constructor() {
    super('treble', 2)
  }
}

class Clef {
  constructor(public readonly name: string,
    // bottom line = 0, lowest space = 1
    public readonly fromBottom: number) { }
}

class ClefEvent extends MusicEvent {
  private event: Clef
}

class MusicEvent {
  private staffId: StaffId
  private startLocation: Time
}

class Staff {
  private events: MusicEvent[]
  private id: StaffId // symbol?
}

export class Score {
  private staves: Staff[]
}
