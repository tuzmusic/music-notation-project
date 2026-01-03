export function createNoteNumberToPitchMap() {
  const noteLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const noSharp = ['B', 'E']

  let currentOctave = -1
  let currentLetterIndex = 0
  const getCurrentLetter = () => noteLetters[currentLetterIndex]

  function incrementPitch() {
    if (currentLetterIndex >= noteLetters.length - 1) {
      currentOctave++
      currentLetterIndex = 0
    } else {
      currentLetterIndex++
    }
  }

  const map = new Map<number, string[]>([[0, [`${noteLetters[currentLetterIndex]}${currentOctave}`]]])

  for (let i = 1; i < 127; i++) {
    const prevEntry = map.get(i - 1)?.[0] // sharp will come before flat in the array
    if (!prevEntry) throw new Error(`nothing in map for ${i - 1}`)

    const prevNote = prevEntry.match(/[A-G][#b]?/)?.[0]
    if (!prevNote) throw new Error(`invalid note format: ${prevEntry}`)

    const theseNotes: string[] = []

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
