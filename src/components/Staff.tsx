import { StaffLines } from "./StaffLines.tsx";
import type { Staff as StaffModel } from "../models/Staff.ts";
import { useMemo } from "react";
import { MusicEvent, MusicEventType, SystemStart as SystemStartModel } from "../models/Score.ts";
import { useScore } from "../contexts/useScore.tsx";
import { SystemStart } from "./SystemStart.tsx";
import { Barline } from "./Barline.tsx";
import { spacing, unknownSpacing } from "../config.ts";
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
        if (!map.has(timeKey)) map.set(timeKey, []);
        map.get(timeKey)?.push(event);

        return map;
      }, new Map<string, MusicEvent[]>());

      const systemStart = new SystemStartModel(null, { num: 0, denom: 16 });
      const firstEvents = eventsByTime.get("0/16")
      if (firstEvents) {
        firstEvents.unshift(systemStart)
      } else {
        eventsByTime.set("0/16", [systemStart])
      }
      return eventsByTime
    }, [score, staffId]
  )

  return events
}

function getEventComponents(eventsByTime: Map<string, MusicEvent[]>) {
  let x = 0
  console.log(eventsByTime)
  return Array.from(eventsByTime.entries()).map(([timeKey, eventsAtTime]) => {
      const [num, denom] = timeKey.split("/").map(Number);
      return eventsAtTime.map((event, i) => {
        const nextEvent = eventsAtTime[i + 1] // JS does not throw out-of-bounds exceptions
        if (nextEvent) {
          x += spacing[event.musicEventType]?.to[nextEvent.musicEventType] ?? unknownSpacing
        }
        console.log(event.musicEventType, x, timeKey)
        switch (event.musicEventType) {
          case MusicEventType.SystemStart:
            return <Barline x={x}/>
          case MusicEventType.Clef:
            return <TrebleClef x={x}/>
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
      <StaffLines/>
      {
        eventComponents
      }
    </>
  )
}
