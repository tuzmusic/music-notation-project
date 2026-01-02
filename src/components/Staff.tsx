import { TrebleClef } from "./clefs/TrebleClef.tsx";
import { StaffLines } from "./StaffLines.tsx";

export function Staff() {
  return (
    <>
      <TrebleClef x={10} />
      <StaffLines />
    </>
  )
}
