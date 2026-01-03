export function createNoteNumberToPitchMap() {
  const noteLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const noSharp = ['B', 'E']

  // MIDI note 0 is C-1
  let currentLetterIndex = 0
  let currentOctave = -1

  function incrementLetter() {
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
    const theseNotes: string[] = []
    const writeWithAccidental = (acc: '#' | 'b' | null, arr: string[] = theseNotes) => {
      const elements = [
        noteLetters[currentLetterIndex],
        acc ?? '',
        currentOctave
      ]
      arr.push(elements.join(''))
    }

    const prevEntry = map.get(i - 1)?.[0] // sharp will come before flat in the array
    if (!prevEntry) throw new Error(`nothing in map for ${i - 1}`)

    const prevNote = prevEntry.match(/[A-G][#b]?/)?.[0]
    if (!prevNote) throw new Error(`invalid note format: ${prevEntry}`)

    const prevNoteNatural = prevNote.length === 1;
    const prevNoteCanBeSharped = !noSharp.includes(prevNote);

    if (prevNoteNatural && prevNoteCanBeSharped) {
      // write the sharp and flat
      writeWithAccidental('#')
      incrementLetter()
      writeWithAccidental('b')
      map.set(i, theseNotes)

      // having incremented the letter, we now write the natural for that letter
      const nextNotes: string[] = []
      writeWithAccidental(null, nextNotes)
      map.set(++i, nextNotes)
    } else {
      incrementLetter()
      writeWithAccidental(null)
      map.set(i, theseNotes)
    }

    i++
  }
  return map
}

console.log(createNoteNumberToPitchMap())
