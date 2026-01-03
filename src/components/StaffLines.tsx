import { config } from "../config.ts";

function StaffLine({ y }: { y: number }) {
  return (
    <line x1={0} x2={"100%"} y1={y} y2={y}
          stroke={"black"} strokeWidth={config.staff.baseLineSize}/>
  )
}

export function StaffLines() {
  return Array.from({ length: config.staff.lines }, (_, i) =>
    <StaffLine key={i} y={i * config.staff.baseSpaceSize}/>
  )
}
