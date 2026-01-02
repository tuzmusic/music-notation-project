import { Glyph } from "../atoms/Glyph.tsx";
import { glyphs } from "../../glyphs.ts";
import { config } from "../../config.tsx";

export function TrebleClef({ x, yOffset }: { x: number, yOffset: number }) {
  const linesFromBottom = 2
  const { baseSpaceSize, lines } = config.staff;
  const y = (lines - linesFromBottom) * baseSpaceSize
  return (
    <Glyph x={x} y={y + yOffset} fontSize={40}>
      {glyphs.trebleClef}
    </Glyph>
  );
}
