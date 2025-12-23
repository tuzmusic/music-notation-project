import styled from "styled-components";
import { StaffLines } from "./components/StaffLines.tsx";
import { glyphs } from "./glyphs.ts";
import { Glyph } from "./components/atoms/Glyph.tsx";

const CenterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid thin grey;
    padding: 0 1rem;
`

function TrebleClef({ x, yOffset }: { x: number, yOffset: number }) {
  return (
    <Glyph x={x} y={30 + yOffset} fontSize={40}>
      {glyphs.trebleClef}
    </Glyph>
  );
}

function Staff({ yOffSet = 0 }) {
  return (
    <>
      <TrebleClef x={10} yOffset={yOffSet}/>
      <StaffLines yOffset={yOffSet}/>
    </>
  )
}

function App() {
  return (
    <CenterWrapper>
      <svg version="1.1" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
        <Staff yOffSet={40}/>
      </svg>
    </CenterWrapper>
  )
}

export default App
