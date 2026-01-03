import { Staff } from "./Staff.tsx";
import { config } from "../config.tsx";

export function Score() {
    return (
        // should this be in the parent svg element?
        <g transform={`translate(0, ${config.page.topMargin})`}>
            <Staff />
        </g>
    );
}
