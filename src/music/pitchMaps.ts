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
    if (!noteLetters[currentLetterIndex + 1]) {
      currentOctave++
      currentLetterIndex = 0
    } else {
      currentLetterIndex++
    }
  }

  for (let i = 65; i < 64 + 12; i++) {
    const prev = map.get(i - 1)?.[0] // sharp will come before flat in the array
    if (!prev) throw new Error(`nothing in map for ${i - 1}`)
    const prevNote = prev.slice(0, -1)

    const theseNotes: string[]  = []

    const prevNoteNatural = prevNote.length === 1;
    const prevNoteCanBeSharped = !noSharp.includes(prevNote);

    const writeWithAccidental = (acc: '#' | 'b' | null) =>
      theseNotes.push(`${getCurrentLetter()}${acc ?? ''}${currentOctave}`)


    if (prevNoteNatural && prevNoteCanBeSharped) {
      writeWithAccidental('#')
      incrementPitch()
      writeWithAccidental('b')
    } else {
      // if prevNoteCanBeSharped (say, prevNote = F) currentNote is already the next note! (G)
      // when we sharped that note we already incremented the pitch
      // TODO: this logic is a little confusing and too stateful
      if (!prevNoteCanBeSharped) {
        incrementPitch()
      }
      writeWithAccidental(null)
    }

    map.set(i, theseNotes)
  }

  return map
}

console.log(createNoteNumberToPitchMap())
