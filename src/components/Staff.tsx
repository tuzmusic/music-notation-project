import { StaffLines } from "./StaffLines.tsx";
import type { Staff as StaffModel } from "../models/Staff.ts";
import { useMemo } from "react";
import { MusicEvent, MusicEventType, SystemStart as SystemStartModel } from "../models/Score.ts";
import { useScore } from "../contexts/useScore.tsx";
import { Barline } from "./Barline.tsx";
import { spacing, unknownSpacing as fallbackSpacing } from "../config.ts";
import { TrebleClef } from "./clefs/TrebleClef.tsx";

function useStaffEvents(staffId: string) {
  const { score } = useScore()
  const events = useMemo(() => {
    const staffEvents = score.getEvents().filter(
      (event) => event.staffId === staffId
    );

    const eventsSorted = staffEvents.sort((a, b) => {
      const timeA = a.startLocation.num / a.startLocation.denom;
      const timeB = b.startLocation.num / b.startLocation.denom;
      return timeA - timeB;
    });

    const eventsByTime = eventsSorted.reduce((map, event) => {
      const timeKey = `${event.startLocation.num}/${event.startLocation.denom}`;
      const eventsAtThisTime = map.get(timeKey)?.concat(event) ?? [event];
      map.set(timeKey, eventsAtThisTime);
      return map;
    }, new Map<string, MusicEvent[]>());

    const systemStart = new SystemStartModel(null, { num: 0, denom: 16 });
    eventsByTime.set("0/16", [systemStart, ...eventsByTime.get("0/16") ?? []])

    return eventsByTime
  }, [score, staffId]
  )

  return events
}

function getEventComponents(eventsByTime: Map<string, MusicEvent[]>) {
  let x = 0
  let lastEvent: MusicEvent | null = null

  return Array.from(eventsByTime.entries()).map(
    ([_timeKey, eventsAtTime]) => {
      return eventsAtTime.map((event) => {
        if (lastEvent) {
          x += spacing[lastEvent.musicEventType]?.to[event.musicEventType] ?? fallbackSpacing
        }
        lastEvent = event

        if (event.musicEventType === MusicEventType.SystemStart) {
          return <Barline x={x} />
        } else if (event.musicEventType === MusicEventType.Clef) {
          return <TrebleClef x={x} />
        }
      })
    }
  )

}

export function Staff({ staff }: { staff: StaffModel }) {
  const eventsByTime = useStaffEvents(staff.id)
  const eventComponents = useMemo(() => getEventComponents(eventsByTime), [eventsByTime])
  return (
    <>
      <StaffLines />
      {eventComponents}
    </>
  )
}
