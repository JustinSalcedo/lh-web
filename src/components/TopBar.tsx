import styled from 'styled-components'
import {StyledLabelSmall, StyledTextLarge} from './commons'
import {observer} from 'mobx-react-lite'
import useTopBarObservable from '../hooks/useTopBarObservable'

const TopBar = observer(() => {
    const topBarObservable = useTopBarObservable()

    return (
        <Container>
            <DateContainer>
                <StyledLabelSmall>
                    {topBarObservable.todaysDate}
                </StyledLabelSmall>
            </DateContainer>
            <ProgressContainer>
                <StyledTextLarge>{topBarObservable.progress}</StyledTextLarge>
            </ProgressContainer>
        </Container>
    )
})

export default TopBar

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* background-color: blue; */
    width: 100%;
    /* position: absolute;
    top: 0; */
    padding-inline: 1rem;
    padding-block: 0.5rem;
    background-color: #222;
    gap: 0.5rem;
`

const DateContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
    width: 100%;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #777;
`

const ProgressContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`
