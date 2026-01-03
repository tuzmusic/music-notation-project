import { config } from "../config.ts";

export function Barline({ x }: { x: number }) {
  const staffHeight = (config.staff.lines - 1) * config.staff.baseSpaceSize;
  return <line
    x1={x} x2={x} y1={0} y2={staffHeight}
    stroke={"black"} strokeWidth={config.barline.baseThickness}/>;
}
