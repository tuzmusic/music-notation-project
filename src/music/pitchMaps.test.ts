import { describe, expect, it } from 'vitest'
import { createNoteNumberToPitchMap } from './pitchMaps'

describe('createNoteNumberToPitchMap', () => {
  it.each([
    [['C-1'], 0, ''],
    [['C0'], 12, ''],
    [['C4'], 60, '(Middle C)'],
    [['E4'], 64, ''],
    [['A4'], 69, '(A440)'],
    [['C#4', 'Db4'], 61, ''],
    [['D#4', 'Eb4'], 63, ''],
    [['F4'], 65, '(E has no sharp)'],
    [['C5'], 72, '(B has no sharp)'],
    [['G9'], 127, '(highest MIDI note)'],
  ])('returns %j for note %i %s', (expected, noteNumber) => {
    expect(createNoteNumberToPitchMap().get(noteNumber)).toEqual(expected)
  })
})
