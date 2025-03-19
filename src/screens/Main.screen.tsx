import styled from 'styled-components'
import BottomBar from '../components/BottomBar'
import TopBar from '../components/TopBar'
import ToolBar from '../components/ToolBar'
import ChecklistView from '../components/ChecklistView'

// MainScreen component
const MainScreen = () => {
    return (
        <Container>
            <TopBar />
            <ToolBar />
            <ChecklistView />
            <BottomBar />
        </Container>
    )
}

export default MainScreen

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`
