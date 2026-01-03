export function createNoteNumberToPitchMap() {
  const noteLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const noSharp = ['B', 'E']

  // MIDI note 0 is C-1
  let currentLetterIndex = 0
  let currentOctave = -1

  function incrementPitch() {
    if (currentLetterIndex >= noteLetters.length - 1) {
      currentOctave++
      currentLetterIndex = 0
    } else {
      currentLetterIndex++
    }
  }

  const map = new Map<number, string[]>([[0, [`${noteLetters[currentLetterIndex]}${currentOctave}`]]])

  let i = 1

  while (!map.has(128)) {
    const prevEntry = map.get(i - 1)?.[0] // sharp will come before flat in the array
    if (!prevEntry) throw new Error(`nothing in map for ${i - 1}`)

    const prevNote = prevEntry.match(/[A-G][#b]?/)?.[0]
    if (!prevNote) throw new Error(`invalid note format: ${prevEntry}`)

    let theseNotes: string[] = []

    const prevNoteNatural = prevNote.length === 1;
    const prevNoteCanBeSharped = !noSharp.includes(prevNote);

    const writeWithAccidental = (acc: '#' | 'b' | null) => {
      const elements = [
        noteLetters[currentLetterIndex],
        acc ?? '',
        currentOctave
      ]
      theseNotes.push(elements.join(''))
    }

    if (prevNoteNatural && prevNoteCanBeSharped) {
      writeWithAccidental('#')
      incrementPitch()
      writeWithAccidental('b')
      map.set(i, theseNotes)

      theseNotes = []
      // current note is correct next natural note
      writeWithAccidental(null)
      map.set(++i, theseNotes)
    } else {
      incrementPitch()
      writeWithAccidental(null)
      map.set(i, theseNotes)
    }
    i++
  }
  return map
}

console.log(createNoteNumberToPitchMap())
