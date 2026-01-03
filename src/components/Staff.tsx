import { StaffLines } from "./StaffLines.tsx";
import type { Staff as StaffModel } from "../models/Staff.ts";
import { useMemo } from "react";
import { StartOfLine as StartOfLineModel } from "../models/Score.ts";
import { useScore } from "../contexts/useScore.tsx";
import { StartOfLine } from "./StartOfLine.tsx";

export function Staff({ staff }: { staff: StaffModel }) {
  const { score } = useScore()
  const events = useMemo(() => {
      const staffEvents = score.getEvents().filter(
        (event) => event.staffId === staff.id
      );

      const eventsSorted = staffEvents.sort((a, b) => {
        const timeA = a.startLocation.num / a.startLocation.denom;
        const timeB = b.startLocation.num / b.startLocation.denom;
        return timeA - timeB;
      });

      const eventsByTime = eventsSorted.reduce((record, event) => {
        const timeKey = `${event.startLocation.num}/${event.startLocation.denom}`;
        if (!record[timeKey]) {
          record[timeKey] = [];
        }
        record[timeKey].push(event);
        return record;
      }, {} as Record<string, typeof staffEvents>);

      eventsByTime["0/16"] = [new StartOfLineModel(null, { num: 0, denom: 16 })];

      return eventsByTime
    }, [score, staff.id]
  )

  return (
    <>
      <StaffLines/>
      {
        Object.entries(events).map(([timeKey, eventsAtTime]) => {
            const [num, denom] = timeKey.split("/").map(Number);
            return eventsAtTime.map((event) => {
              switch (event.musicEventType) {
                case 'StartOfLine':
                  return <StartOfLine/>
              }
            })
          }
        )
      }
    </>
  )
}
