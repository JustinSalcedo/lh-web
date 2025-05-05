import {ITransaction} from '../types/ITransaction'
import styled from 'styled-components'
import TransactionCard from './TransactionCard'
import Transaction from '../transactions/transaction'

const TransactionList = ({transactions}: {transactions: Transaction[]}) => (
    <Container>
        {transactions.map((transaction: ITransaction, index: number) => (
            <TransactionCard key={index} transaction={transaction} />
        ))}
    </Container>
)

export default TransactionList

const Container = styled.div`
    padding: 1rem;
    height: 100%;
    overflow-y: scroll;
    width: 100%;
    background-color: #181818;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
