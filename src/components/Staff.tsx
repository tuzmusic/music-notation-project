import { TrebleClef } from "./clefs/TrebleClef.tsx";
import { StaffLines } from "./StaffLines.tsx";

export function Staff() {
  return (
    <>
      <StaffLines />
      <TrebleClef x={10} />
    </>
  )
}
