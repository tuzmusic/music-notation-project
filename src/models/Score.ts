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
  public readonly id: string = crypto.randomUUID();
  constructor(
    public readonly staffId: StaffId,
    public readonly startLocation: Time
  ) {}
}

export class ClefEvent extends MusicEvent {
  constructor(
    staffId: StaffId,
    startLocation: Time,
    public readonly clef: Clef
  ) {
    super(staffId, startLocation);
  }
}


export class Staff {
  public readonly id: StaffId = crypto.randomUUID()// symbol?
}

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
