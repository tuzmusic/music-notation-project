import { TrebleClef } from "./clefs/TrebleClef.tsx";
import { StaffLines } from "./StaffLines.tsx";

export function Staff({ yOffSet = 0 }) {
  return (
    <>
      <TrebleClef x={10} yOffset={yOffSet}/>
      <StaffLines yOffset={yOffSet}/>
    </>
  )
}
