import styled from "styled-components";
import { Score } from "./components/Score.tsx";
import { EventsList } from "./components/EventsList.tsx";
import { useScore } from "./contexts/useScore.tsx";

const CenterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid thin grey;
    padding: 0 1rem;
`

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
`

function App() {
  useScore();

  return (
    <AppContainer>
      <CenterWrapper>
        <svg version="1.1" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
          <Score />
        </svg>
      </CenterWrapper>
      <EventsList />
    </AppContainer>
  )
}

export default App
