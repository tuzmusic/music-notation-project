const pitches = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const noSharp = ['B', 'E']
const noFlat = ['C', 'F']

export function createNoteNumberToPitchMap() {
  const map = new Map<number, string[]>

  let currentOctave = 4 // TODO NEXT: ALSO TRACK PITCH (instead of using previous pitch)

  map.set(64, [`E${currentOctave}`])

  for (let i = 65; i < 128; i++) {
    const prev = map.get(i - 1)?.[0] // sharp will come before flat
    if (!prev) throw new Error(`nothing in map for ${i - 1}`)

    const prevNote = prev.slice(0, -1)
    const prevNoteNameIndex = pitches.indexOf(prev.slice(0, 1));

    let thisPitch = pitches[prevNoteNameIndex + 1]

    if (!thisPitch) {
      currentOctave += 1
      thisPitch = pitches[0]
    }

    // prev is NATURAL
    if (prevNote.length === 1) {
      const theseNotes = []
      if (!noSharp.includes(thisPitch)) {
        theseNotes.push(`${prevNote}#${currentOctave}`)
      }
      map.set(i,
        [`${prevNote}#${currentOctave}`]
      )
    }

    // get prev pitch
    // if natural,
    //   set(i, prev+"#"), unless prev is E or B, in which case set (i, next)
    //   and set (i, next+"b")
    // else
    //   set(i, next)
  }

  return map
}

console.log(createNoteNumberToPitchMap())
