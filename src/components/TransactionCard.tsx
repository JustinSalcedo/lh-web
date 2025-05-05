import {ITransaction} from '../types/ITransaction'
import styled from 'styled-components'

// TransactionCard component using transaction: ITransaction prop
const TransactionCard = ({transaction}: {transaction: ITransaction}) => {
    return (
        <CardContainer>
            <FirstLine>
                <TruncateDescription>
                    {transaction.description}
                </TruncateDescription>
                {transaction.amount < 0 ? (
                    <StyledAmount color={'crimson'}>
                        {`-$${Math.abs(transaction.amount)}`}
                    </StyledAmount>
                ) : (
                    <StyledAmount>${transaction.amount}</StyledAmount>
                )}
            </FirstLine>
            <span>
                {new Date(transaction.dateInMs).toLocaleString('es', {
                    dateStyle: 'full',
                    // timeStyle: 'short',
                    // hour12: true,
                })}
            </span>
        </CardContainer>
    )
}

export default TransactionCard

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    background-color: #222;
    padding: 1rem;
    border-radius: 0.5rem;
    gap: 0.5rem;
`

const StyledAmount = styled.span`
    font-weight: bold;
    font-size: 1.25rem;
    color: ${({color}) => color || 'white'};
    width: 5rem;
    text-align: right;
`

const TruncateDescription = styled.span`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.125rem;
`

const FirstLine = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
`
