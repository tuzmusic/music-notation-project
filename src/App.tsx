import styled from "styled-components";
import { StaffLines } from "./components/StaffLines.tsx";

const CenterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid thin grey;
    padding: 1rem
`

function App() {
  return (
    <CenterWrapper>
      <svg version="1.1" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">

        <StaffLines/>

      </svg>
    </CenterWrapper>
  )
}

export default App
