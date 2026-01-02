import styled from "styled-components";
import { Staff } from "./components/Staff.tsx";
import { ScoreProvider } from "./contexts/ScoreContext.tsx";

const CenterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid thin grey;
    padding: 0 1rem;
`

function App() {
  const yOffSet = 40;

  return (
    <ScoreProvider>
      <CenterWrapper>
        <svg version="1.1" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
          <Staff yOffSet={yOffSet}/>
        </svg>
      </CenterWrapper>
    </ScoreProvider>
  )
}

export default App
