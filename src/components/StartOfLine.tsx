import { config } from "../config.ts";

export function StartOfLine() {
  const staffHeight = (config.staff.lines - 1) * config.staff.baseSpaceSize;
  return <line
    x1={0} x2={0} y1={0} y2={staffHeight}
    stroke={"black"} strokeWidth={config.staff.baseLineSize * 2}/>;
}
