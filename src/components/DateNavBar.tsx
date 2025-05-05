import styled from 'styled-components'
import DateSeeker from './DateSeeker'
import CloseButton from './CloseButton'
import useViewsObservable from '../hooks/useViewsObservable'
import useTransactionObservable from '../hooks/useTransactionObservable'

const DateNavBar = () => {
    const viewsObservable = useViewsObservable()
    const transactionObservable = useTransactionObservable()

    return (
        <Container>
            <HorizontalSpace />
            <DateSeeker
                size="large"
                date={transactionObservable.dateOnView}
                onDateChange={date => transactionObservable.setDateOnView(date)}
                onPreviousDay={() => transactionObservable.viewPreviousDay()}
                onNextDay={() => transactionObservable.viewNextDay()}
            />
            <CloseButton
                onClick={() => viewsObservable.setCurrentView('checklist')}
            />
        </Container>
    )
}

export default DateNavBar

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-inline: 1rem;
    padding-block: 1rem;
    background-color: #222;
    gap: 0.5rem;
    margin-bottom: 1rem;
`

const HorizontalSpace = styled.div`
    width: 1.5rem;
    height: 1px;
`
