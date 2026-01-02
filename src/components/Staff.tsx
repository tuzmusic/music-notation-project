import { TrebleClef } from "./clefs/TrebleClef.tsx";
import { StaffLines } from "./StaffLines.tsx";

export function Staff({ yOffset = 0 }) {
  return (
    <>
      <TrebleClef x={10} yOffset={yOffset}/>
      <StaffLines yOffset={yOffset}/>
    </>
  )
}
