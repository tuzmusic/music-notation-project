import { config } from "../config.ts";
import { Staff } from "./Staff.tsx";
import { useScore } from "../contexts/useScore.tsx";

export function Score() {
    const { score } = useScore();
    const staves = score.getStaves();

    return (
        // should this be in the parent svg element?
        <g transform={`translate(0, ${config.page.topMargin})`}>
            {staves.map((staff) => (
                <Staff key={staff.id} staff={staff} />
            ))}

        </g>
    );
}
