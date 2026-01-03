import { Glyph } from "../atoms/Glyph.tsx";
import { glyphs } from "../../glyphs.ts";
import { config } from "../../config.ts";

export function TrebleClef({ x }: { x: number }) {
  const linesFromBottom = 2
  const { baseSpaceSize, lines } = config.staff;
  const y = (lines - linesFromBottom) * baseSpaceSize
  return (
    <Glyph x={x} y={y} fontSize={40}>
      {glyphs.trebleClef}
    </Glyph>
  );
}
