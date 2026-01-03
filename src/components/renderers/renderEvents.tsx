
import { spacing, unknownSpacing as fallbackSpacing } from "../../config.ts";
import { Barline } from "../Barline.tsx";
import { TrebleClef } from "../clefs/TrebleClef.tsx";
import { MusicEvent, MusicEventType } from "../../models/MusicEvent.ts";

export function renderEvents(eventsByTime: Map<string, MusicEvent[]>) {
  let x = 0
  let lastEvent: MusicEvent | null = null

  // no useMemo because we're using React Compiler
  return Array.from(eventsByTime.entries()).map(
    ([_timeKey, eventsAtTime]) => {
      return eventsAtTime.map((event) => {
        if (lastEvent) {
          x += spacing[lastEvent.musicEventType]?.to[event.musicEventType] ?? fallbackSpacing
        }
        console.log(event.musicEventType, lastEvent?.musicEventType)
        lastEvent = event

        if (event.musicEventType === MusicEventType.SystemStart) {
          return <Barline key={event.id} x={x}/>
        } else if (event.musicEventType === MusicEventType.Clef) {
          return <TrebleClef key={event.id} x={x}/> // todo: polymorphic clef component
        }
      })
    }
  )
}
