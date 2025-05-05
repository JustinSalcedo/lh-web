import styled from 'styled-components'
import DateNavBar from '../components/DateNavBar'
import TransactionList from '../components/TransactionList'
import AddButton from '../components/AddButton'
import useViewsObservable from '../hooks/useViewsObservable'
import {observer} from 'mobx-react-lite'
import useTransactionObservable from '../hooks/useTransactionObservable'

const TransactionsView = observer(() => {
    const viewsObservable = useViewsObservable()
    const transactionObservable = useTransactionObservable()

    return (
        <>
            <DateNavBar />
            <TransactionList
                transactions={transactionObservable.transactionsOnView}
            />
            <AddButtonContainer>
                <AddButton
                    onClick={() =>
                        viewsObservable.setCurrentView('add-transaction')
                    }
                />
            </AddButtonContainer>
        </>
    )
})

export default TransactionsView

const AddButtonContainer = styled.div`
    position: absolute;
    bottom: 5.5rem;
    right: 1rem;
    // create shadow
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`
