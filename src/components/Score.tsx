import { Staff } from "./Staff.tsx";
import { config } from "../config.tsx";

export function Score() {
  return (
    <g transform={`translate(0, ${config.page.topMargin})`}>
      <Staff />
    </g>
  );
}
