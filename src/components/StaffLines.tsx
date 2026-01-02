import { config } from "../config.tsx";

function StaffLine({ y }: { y: number }) {
  return (
    <line x1={0} x2={"100%"} y1={y} y2={y} stroke={"black"} strokeWidth={config.staff.baseSize}/>
  )
}

export function StaffLines() {
  return Array.from({ length: config.staff.lines }, (_, i) =>
    <StaffLine y={i * config.staff.baseSpaceSize}/>
  )
}
