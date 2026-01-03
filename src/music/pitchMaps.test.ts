import { describe, it, expect } from 'vitest'
import { createNoteNumberToPitchMap } from './pitchMaps'

describe('createNoteNumberToPitchMap', () => {
  it('should create a map with correct note mappings', () => {
    const map = createNoteNumberToPitchMap()

    // Test MIDI note 0 (C-1)
    expect(map.get(0)).toEqual(['C-1'])

    // Test MIDI note 12 (C0)
    expect(map.get(12)).toEqual(['C0'])

    // Test MIDI note 60 (C4 / Middle C)
    expect(map.get(60)).toEqual(['C4'])

    // Test MIDI note 64 (E4)
    expect(map.get(64)).toEqual(['E4'])

    // Test MIDI note 69 (A4 / 440 Hz)
    expect(map.get(69)).toEqual(['A4'])

    // Test a sharp/flat note (MIDI note 61 should be C#4/Db4)
    expect(map.get(61)).toEqual(['C#4', 'Db4'])

    // Test a sharp/flat note (MIDI note 63 should be D#4/Eb4)
    expect(map.get(63)).toEqual(['D#4', 'Eb4'])

    // Test B and E don't have sharps (MIDI note 65 should just be F4)
    expect(map.get(65)).toEqual(['F4'])

    // Test MIDI note 126 (F#9/Gb9 - highest in the map since loop is < 127)
    expect(map.get(126)).toEqual(['F#9', 'Gb9'])

    // Test that map doesn't include 127 (loop is i < 127)
    expect(map.get(127)).toBeUndefined()
  })
})
