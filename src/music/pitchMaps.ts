const noteLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const noSharp = ['B', 'E']
const noFlat = ['C', 'F']

export function createNoteNumberToPitchMap() {
  const map = new Map<number, string[]>

  let currentOctave = 4 // TODO NEXT: ALSO TRACK PITCH (instead of using previous pitch)
  let currentLetterIndex = noteLetters.indexOf('E')
  const getCurrentLetter = () => noteLetters[currentLetterIndex]

  map.set(64, [`${noteLetters[currentLetterIndex]}${currentOctave}`])

  function incrementPitch() {
    let nextNoteLetter = noteLetters[currentLetterIndex + 1];
    if (!nextNoteLetter) {
      currentOctave++
      currentLetterIndex = 0
    } else {
      currentLetterIndex++
    }
  }

  for (let i = 65; i < 128; i++) {
    incrementPitch()
    map.set(i, [`${noteLetters[currentLetterIndex]}${currentOctave}`])
  }

  return map

  for (let i = 65; i < 128; i++) {
    // if (noSharp.includes(getCurrentLetter())) {
    //   currentLetterIndex++
    // }


    const prev = map.get(i - 1)?.[0] // sharp will come before flat
    if (!prev) throw new Error(`nothing in map for ${i - 1}`)

    const prevNote = prev.slice(0, -1)
    const prevNoteNameIndex = noteLetters.indexOf(prev.slice(0, 1));

    let thisPitch = noteLetters[prevNoteNameIndex + 1]

    if (!thisPitch) {
      currentOctave += 1
      thisPitch = noteLetters[0]
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
