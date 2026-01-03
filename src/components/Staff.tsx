import { StaffLines } from "./StaffLines.tsx";
import type { Staff as StaffModel } from "../models/Staff.ts";
import { MusicEvent, Score } from "../models/Score.ts";
import { SystemStart as SystemStartModel } from "../models/SystemStart.ts";
import { useScore } from "../contexts/useScore.tsx";
import { renderEvents } from "./renderers/renderEvents.tsx";

// no useMemo because we're using React Compiler
// todo (possibly): move this to Staff#getEventsByTime,
//  and call that from a useMemo in the component
function getStaffEvents(score: Score, staffId: string) {
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
}

export function Staff({ staff }: { staff: StaffModel }) {
  const { score } = useScore()
  const eventsByTime = getStaffEvents(score, staff.id)
  const eventComponents = renderEvents(eventsByTime)
  return (
    <>
      <StaffLines/>
      {eventComponents}
    </>
  )
}
