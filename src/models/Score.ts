export type Time = {
  num: number
  denom: 16 // todo: support other resolutions
}

export type StaffId = string // symbol?

export class Clef {
  constructor(public readonly name: string,
    // bottom line = 0, lowest space = 1
    public readonly fromBottom: number) {
  }
}

export class TrebleClef extends Clef {
  constructor() {
    super('treble', 2)
  }
}

export class MusicEvent {
  private staffId: StaffId
  private startLocation: Time
}

export class ClefEvent extends MusicEvent {
  private event: Clef
}


export class Staff {
  private events: MusicEvent[] = []
  private readonly id: StaffId = crypto.randomUUID()// symbol?


  public addEvent(event: MusicEvent) {
    this.events.push(event)
  }

  public getEvents() {
    return this.events
  }
}

export class Score {
  private staves: Staff[] = []

  public addStaff(staff: Staff) {
    this.staves.push(staff);
  }

  public getStaves() {
    return this.staves;
  }
}
