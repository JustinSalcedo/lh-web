import styled from 'styled-components'
import BottomBar from '../components/BottomBar'
import useViewsObservable from '../hooks/useViewsObservable'
import ChecklistView from '../views/Checklist.view'
import TransactionsView from '../views/Transactions.view'
import {observer} from 'mobx-react-lite'
import AddTransaction from '../views/AddTransaction.view'

// MainScreen component
const MainScreen = observer(() => {
    const viewsObservable = useViewsObservable()

    return (
        <Container>
            {viewsObservable.currentView === 'checklist' && <ChecklistView />}
            {viewsObservable.currentView === 'transactions' && (
                <TransactionsView />
            )}
            {viewsObservable.currentView === 'add-transaction' && (
                <AddTransaction />
            )}
            <BottomBar />
        </Container>
    )
})

export default MainScreen

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`
