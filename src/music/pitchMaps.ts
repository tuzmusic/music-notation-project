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

  for (let i = 65; i < 64 + 12; i++) {
    // we still need to check the previous entry to see if it was a sharp or flat
    // because we're not going to track that (or are we, I guess?)
    const prev = map.get(i - 1)?.[0] // sharp will come before flat in the array
    if (!prev) throw new Error(`nothing in map for ${i - 1}`)
    const prevNote = prev.slice(0, -1)

    const theseNotes = []

    const prevNoteNatural = prevNote.length === 1;
    const prevNoteCanBeSharped = !noSharp.includes(prevNote);
    if (prevNoteNatural && prevNoteCanBeSharped) {
      // write sharp that natural's letter, and flat for the next one
      // write the sharp
      theseNotes.push(`${getCurrentLetter()}#${currentOctave}`)
      incrementPitch()
      // write the flat
      theseNotes.push(`${getCurrentLetter()}b${currentOctave}`)
    } else {
      incrementPitch()
      theseNotes.push(`${getCurrentLetter()}${currentOctave}`)
    }

    map.set(i, theseNotes)
  }

  return map
}

console.log(createNoteNumberToPitchMap())
